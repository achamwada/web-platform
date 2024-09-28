
import {
  APIGatewayEventRequestContextWithAuthorizer,
  APIGatewayProxyEventBase,
  APIGatewayProxyCallback, Context as LambdaContext 
} from 'aws-lambda'

import {
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_DELIVERY_TOKEN,
  CONTENTFUL_ENVIRONMENT,
  BAD_REQUEST,
  VALID_ERROR_MESSAGES,
  INTERNAL_SERVER_ERROR,
} from "./config/constants";
import { ContentfulService } from "./services/contentfulService";
import { generateAPIGWResponse } from './services/apiGateway';

export interface EventType
  extends APIGatewayProxyEventBase<
    APIGatewayEventRequestContextWithAuthorizer<unknown>
  > {
  params: {
    querystring: {
      spaceName?: string
      contentEntryKey: string
      contentType: string
    }
  }
}

export const handler = async (
  event: EventType,
  context: LambdaContext,
  callback: APIGatewayProxyCallback,
): Promise<Record<string, unknown> | void> => {
  const { awsRequestId } = context

  const contentEntryKey = event.queryStringParameters?.contentEntryKey || ''
  const contentTypeId = event.queryStringParameters?.contentTypeId || ''

  console.log("[handler] =>", {
    contentTypeId,
    contentEntryKey,
    CONTENTFUL_SPACE_ID,
    CONTENTFUL_DELIVERY_TOKEN,
    CONTENTFUL_ENVIRONMENT,
    event,
  });

  if (!contentTypeId) {
    return generateAPIGWResponse({
      statusCode: 400,
        body: BAD_REQUEST,
        contentEntryKey,
        awsRequestId,

    }, callback);
  }

  try {
    // Initialize the Contentful service
    const contentfulService = new ContentfulService({
      space: CONTENTFUL_SPACE_ID,
      accessToken: CONTENTFUL_DELIVERY_TOKEN,
      environment: CONTENTFUL_ENVIRONMENT,
    });
    // If contentEntryKey is provided, fetch a single entry
    if (contentEntryKey) {
      const entry = await contentfulService.getEntry(
        contentTypeId,
        contentEntryKey
      );
      return generateAPIGWResponse({
        statusCode: 200,
        body: entry,
        awsRequestId,
        contentEntryKey,
      }, callback);
    } else {
      const entries = await contentfulService.getEntries(contentTypeId);
      return generateAPIGWResponse({
        statusCode: 200,
        body: entries,
        awsRequestId,
        contentEntryKey,
      }, callback);
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { code, message } = error
    return generateAPIGWResponse({
      statusCode: code ?? 500,
      body: VALID_ERROR_MESSAGES.includes(message)
        ? message
        : INTERNAL_SERVER_ERROR,
      contentEntryKey,
      awsRequestId,
    }, callback);
  }
};
