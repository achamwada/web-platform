import dotenvExtended from "dotenv-extended";

// Load environment variables
dotenvExtended.load();

// Retrieve the environment variables
export const OPTIMIZELY_API_URL = process.env.OPTIMIZELY_API_URL as string;
export const OPTIMIZELY_API_KEY = process.env.OPTIMIZELY_API_KEY as string;
export const OPTIMIZELY_API_ID = process.env.OPTIMIZELY_API_ID as string;
export const OPTIMIZELY_API_SECRET = process.env
  .OPTIMIZELY_API_SECRET as string;
export const OPTIMIZELY_GRANT_TYPE = "client_credentials";

export const SERVICES = {
  OPTIMIZELY: "OPTIMIZELY",
  API_TYPE_GENERATOR: "API Type Generator",
};
