import dotenvExtended from "dotenv-extended";

dotenvExtended.load({
  path: ".env",
  defaults: ".env.defaults",
  schema: ".env.example",
  includeProcessEnv: true,
  silent: false,
  errorOnMissing: true,
  errorOnExtra: false,
  overrideProcessEnv: false,
});

export const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID || "";
export const CONTENTFUL_DELIVERY_TOKEN =
  process.env.CONTENTFUL_DELIVERY_TOKEN || "";
export const CONTENTFUL_ENVIRONMENT =
  process.env.CONTENTFUL_ENVIRONMENT || "master";
