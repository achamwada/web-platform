import contentManagementSystem from "@api/content-management-system";
import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import {
  OPTIMIZELY_API_ID,
  OPTIMIZELY_API_SECRET,
  OPTIMIZELY_GRANT_TYPE,
} from "./utils/constants";

const run = async () => {
  //   const contentTypes = await client.contentTypes_List();
  const authToken = await contentManagementSystem.oauth_Token({
    client_id: OPTIMIZELY_API_ID,
    client_secret: OPTIMIZELY_API_SECRET,
    grant_type: OPTIMIZELY_GRANT_TYPE,
  });
  console.log("client ===>", { contentTypes: [], authToken });
};

run();
