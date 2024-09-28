import dotenvExtended from "dotenv-extended";

dotenvExtended.load();

// dotenvExtended.load({
//   // path: ".env",
//   // defaults: ".env.defaults",
//   // schema: ".env.example",
//   includeProcessEnv: true,
//   silent: false,
//   errorOnMissing: false,
//   errorOnExtra: false,
//   overrideProcessEnv: false,
// });

export const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID || "";
export const CONTENTFUL_DELIVERY_TOKEN =
  process.env.CONTENTFUL_DELIVERY_TOKEN || "";
export const CONTENTFUL_ENVIRONMENT =
  process.env.CONTENTFUL_ENVIRONMENT || "master";



  export const INTERNAL_SERVER_ERROR = 'Internal Server Error'
export const BAD_REQUEST = 'The query you sent was invalid.'
export const NOT_FOUND = 'Content not found.'

export const VALID_ERROR_MESSAGES = [
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  NOT_FOUND,
]

export const FIELDS_CONTENT_ENTRY_KEY = 'fields.contentEntryKey'

export const ERROR_CODE_DESCRIPTION: Record<number, string> = {
  200: '200 OK',
  400: '400 Bad Request',
  404: '404 Not Found',
  500: '500 Internal Server Error',
}
