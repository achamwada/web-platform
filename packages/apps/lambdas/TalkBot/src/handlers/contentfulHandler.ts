import { APIGatewayProxyHandler } from "aws-lambda";
import { ContentfulService } from "../services/contentfulService";
import {
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_DELIVERY_TOKEN,
} from "../config/constants";

export const handler: APIGatewayProxyHandler = async (event) => {
  const contentTypeId = event.queryStringParameters?.contentTypeId;
  const contentEntryKey = event.queryStringParameters?.contentEntryKey;
  console.log("[handler] =>", {
    contentTypeId,
    contentEntryKey,
    CONTENTFUL_SPACE_ID,
    CONTENTFUL_DELIVERY_TOKEN,
  });

  if (!contentTypeId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "contentTypeId is required" }),
    };
  }

  try {
    // Initialize the Contentful service
    const contentfulService = new ContentfulService({
      space: CONTENTFUL_SPACE_ID,
      accessToken: CONTENTFUL_DELIVERY_TOKEN,
    });
    // If contentEntryKey is provided, fetch a single entry
    if (contentEntryKey) {
      const entry = await contentfulService.getEntry(
        contentTypeId,
        contentEntryKey
      );
      return {
        statusCode: 200,
        body: JSON.stringify(entry),
      };
    } else {
      const entries = await contentfulService.getEntries(contentTypeId);
      return {
        statusCode: 200,
        body: JSON.stringify(entries),
      };
    }
  } catch (error) {
    // Error handling
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error fetching content from Contentful",
        //@ts-ignore
        error: error.message,
      }),
    };
  }
};
