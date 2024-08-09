import dotenvExtended from "dotenv-extended";

// Load environment variables
dotenvExtended.load();

// Retrieve the environment variables
export const OPTIMIZELY_API_URL = process.env.OPTIMIZELY_API_URL as string;
export const OPTIMIZELY_API_KEY = process.env.OPTIMIZELY_API_KEY as string;
