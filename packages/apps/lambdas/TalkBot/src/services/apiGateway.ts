import { APIGatewayProxyCallback } from "aws-lambda";

export interface Params {
  statusCode: number;
  body: unknown;
  contentEntryKey: string;
  awsRequestId: string;
}

export const generateAPIGWResponse = (
  { body, awsRequestId, contentEntryKey, statusCode }: Params,
  callback: APIGatewayProxyCallback
): Record<string, unknown> | void => {
  return callback(
    JSON.stringify({
      statusCode,
      body,
      contentEntryKey,
      awsRequestId,
    })
  );
};
