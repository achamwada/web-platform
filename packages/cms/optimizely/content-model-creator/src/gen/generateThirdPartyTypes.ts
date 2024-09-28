import { generateApi } from "swagger-typescript-api";
import * as path from "path";
import * as fs from "fs";
import logger from "../services/logger";
import { SERVICES } from "../utils/constants";

interface SwaggerMeta {
  url: string;
  title: string;
  namespace: string;
  version?: string;
}

const swaggerMeta: SwaggerMeta[] = [
  {
    url: "https://app-twen05saas00up1p001.cms.optimizely.com/_cms/preview2/docs/content-openapi.json",
    title: "Optimizely CMS Content API",
    namespace: "Optimizely",
    version: "preview2",
  },
];

async function generateTypes() {
  for (const { url, namespace, title } of swaggerMeta) {
    const outputPath = path.join(__dirname, "../");
    const tempOutputPath = path.join(
      outputPath,
      `src/types/autogen/${namespace}/temp`
    );
    const finalOutputFile = path.join(
      outputPath,
      `src/types/autogen/${namespace}/${title}.ts`
    );
    if (!fs.existsSync(tempOutputPath)) {
      fs.mkdirSync(tempOutputPath, { recursive: true });
    }

    await generateApi({
      name: "tempApi.ts",
      url: url,
      output: tempOutputPath,
      httpClientType: "fetch",
    });

    // Merge generated files
    const files = fs.readdirSync(tempOutputPath);
    let mergedContent = "";
    files.forEach((file) => {
      const content = fs.readFileSync(path.join(tempOutputPath, file), "utf-8");
      mergedContent += content + "\n";
    });

    fs.writeFileSync(finalOutputFile, mergedContent);
    fs.rmdirSync(tempOutputPath, { recursive: true });
  }
  logger.info({
    message: "Types merged and generated successfully!",
    service: SERVICES.API_TYPE_GENERATOR,
  });
}

generateTypes().catch((error) =>
  logger.error({
    message: error.message,
    service: SERVICES.API_TYPE_GENERATOR,
    data: error,
  })
);
