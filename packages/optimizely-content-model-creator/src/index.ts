import contentManagementSystem from "@api/content-management-system";
import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { OPTIMIZELY_API_KEY } from "./utils/constants";

const client = contentManagementSystem.auth(OPTIMIZELY_API_KEY);

// Define the directory to scan for components
const componentsDir = path.resolve(__dirname, "components");

interface ContentTypeProperty {
  name: string;
  fieldType: string;
  description: string;
  required: boolean;
  mayContainTypes?: string[];
}

interface ContentType {
  name: string;
  description: string;
  properties: ContentTypeProperty[];
  mayContainTypes?: string[];
}

/**
 * Function to check if a content type already exists in Optimizely.
 * @param contentTypeName - The name of the content type to check.
 * @returns A promise that resolves to true if the content type exists, false otherwise.
 */
async function contentTypeExists(contentTypeName: string): Promise<boolean> {
  try {
    const response = await client.contentTypes_List();
    const contentTypes = response.data.items;

    // Ensure contentTypes is defined and is an array before proceeding
    if (Array.isArray(contentTypes)) {
      return contentTypes.some((type: any) => type.name === contentTypeName);
    } else {
      console.error("Unexpected response format: 'items' is not an array");
      return false;
    }
  } catch (err) {
    console.error("Error fetching content types:", err);
    throw err;
  }
}

/**
 * Generate JSON schema for a given TypeScript component.
 * @param tsFilePath - The path to the TypeScript file.
 * @param typeName - The name of the TypeScript type to generate the schema for.
 * @returns The generated JSON schema.
 */
function generateJsonSchema(tsFilePath: string, typeName: string): any {
  const jsonSchema = execSync(
    `npx typescript-json-schema ${tsFilePath} ${typeName} --required`,
    {
      encoding: "utf-8",
    }
  );
  return JSON.parse(jsonSchema);
}

/**
 * Maps a JSON schema to Optimizely content type properties.
 * @param jsonSchema - The JSON schema generated from TypeScript.
 * @returns The Optimizely content type properties.
 */
function mapJsonSchemaToContentTypeProps(
  jsonSchema: any
): ContentTypeProperty[] {
  const properties = jsonSchema.properties || {};
  return Object.keys(properties).map((key) => {
    const prop = properties[key];

    let fieldType: string = "String"; // Default to String
    let mayContainTypes: string[] | undefined = undefined;

    if (prop.type === "boolean") {
      fieldType = "Boolean";
    } else if (prop.type === "number") {
      fieldType = "Number";
    } else if (prop.type === "integer") {
      fieldType = "Integer";
    } else if (prop.type === "object" && prop.properties) {
      // If the object has properties, assume it's a nested content type
      fieldType = "ContentReference";
      mayContainTypes = [key]; // This assumes the key is the name of the nested content type
    } else if (prop.type === "array" && prop.items.type === "object") {
      // Handle array of objects as ContentArea
      fieldType = "ContentArea";
      mayContainTypes = [key]; // This assumes the key is the name of the nested content type
    }

    return {
      name: key,
      fieldType,
      description: prop.description || "",
      required: prop.required || false,
      ...(mayContainTypes ? { mayContainTypes } : {}),
    };
  });
}

/**
 * Creates or updates an Optimizely content type.
 * @param contentTypeName - The name of the content type to create.
 * @param contentTypeProps - The properties of the content type.
 */
async function createOptimizelyContentType(
  contentTypeName: string,
  contentTypeProps: ContentTypeProperty[]
): Promise<void> {
  const exists = await contentTypeExists(contentTypeName);
  if (exists) {
    console.log(`Content type "${contentTypeName}" already exists. Skipping.`);
    return;
  }

  // Identify top-level mayContainTypes based on ContentReference or ContentArea fields
  const mayContainTypes = contentTypeProps
    .filter((prop) => prop.mayContainTypes)
    .flatMap((prop) => prop.mayContainTypes!);

  const contentType: ContentType = {
    name: contentTypeName,
    description: `Content type for ${contentTypeName}`,
    properties: contentTypeProps.map((prop) => ({
      name: prop.name,
      fieldType: prop.fieldType,
      description: prop.description,
      required: prop.required,
    })),
    ...(mayContainTypes.length > 0 ? { mayContainTypes } : {}),
  };

  try {
    await client.contentTypes_Create(contentType as any);
    console.log(
      `Content type "${contentTypeName}" created/updated successfully.`
    );
  } catch (err) {
    console.error(
      `Error creating/updating content type "${contentTypeName}":`,
      err
    );
  }
}

/**
 * Processes all components in the specified directory and creates/upgrades their corresponding Optimizely content types.
 * @param dir - The directory to process.
 */
async function processAllComponents(dir: string): Promise<void> {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await processAllComponents(filePath);
    } else if (file.endsWith(".tsx")) {
      const componentName = path.basename(file, ".tsx");
      try {
        const jsonSchema = generateJsonSchema(
          filePath,
          `${componentName}Props`
        );
        const contentTypeProps = mapJsonSchemaToContentTypeProps(jsonSchema);

        // Handle nested content types if necessary
        for (const prop of contentTypeProps) {
          if (
            prop.fieldType === "ContentReference" ||
            prop.fieldType === "ContentArea"
          ) {
            // Recursively check and create the nested content type
            const nestedContentTypeName = prop.mayContainTypes
              ? prop.mayContainTypes[0]
              : prop.name;
            if (!(await contentTypeExists(nestedContentTypeName))) {
              const nestedSchema = generateJsonSchema(
                filePath,
                `${nestedContentTypeName}Props`
              );
              const nestedContentTypeProps =
                mapJsonSchemaToContentTypeProps(nestedSchema);
              await createOptimizelyContentType(
                nestedContentTypeName,
                nestedContentTypeProps
              );
            }
          }
        }

        await createOptimizelyContentType(componentName, contentTypeProps);
      } catch (error) {
        console.error(`Error processing component "${componentName}":`, error);
      }
    }
  }
}

// Start the process
processAllComponents(componentsDir)
  .then(() => console.log("All components processed successfully."))
  .catch((error) => console.error("Error processing components:", error));
