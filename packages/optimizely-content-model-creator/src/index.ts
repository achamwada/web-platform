import Optimizely from "./services/optimizely";

const run = async () => {
  const client = Optimizely.getInstance().getApiClient();
  console.log("client ===>", client);
  const contentType = await client.contenttypes.contentTypesGet("Experience");
  console.log("contentType ===>", contentType);
};

run();

