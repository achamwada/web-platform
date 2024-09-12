import {
  Api,
  HttpResponse,
  OauthToken,
  OauthTokenError,
  OauthTokenRequest,
} from "../../src/types/autogen/Optimizely/Optimizely CMS Content API";
import { type Api as APIType } from "../../src/types/autogen/Optimizely/OptimizelyCMSContentAPI";
import {
  OPTIMIZELY_API_ID,
  OPTIMIZELY_API_SECRET,
  OPTIMIZELY_GRANT_TYPE,
} from "../../utils/constants";

export type OauthTokenResponse = Promise<
  HttpResponse<OauthToken, OauthTokenError>
>;

class OptimizelyClient {
  private static instance: OptimizelyClient;
  private apiClient: APIType<unknown>;

  // Private constructor to prevent instantiation from outside
  private constructor() {
    this.apiClient = new Api();
    this.authenticate();
  }

  // Handles OAuth authentication and sets the access token for the API client
  private async authenticate(): Promise<void> {
    const authRequest: OauthTokenRequest = {
      client_id: OPTIMIZELY_API_ID,
      client_secret: OPTIMIZELY_API_SECRET,
      grant_type: OPTIMIZELY_GRANT_TYPE,
    };

    try {
      const tokenResponse = await this.apiClient.oauth.oauthToken(authRequest);

      /*if (tokenResponse.data.access_token) {
        this.apiClient.configuration.accessToken =
          tokenResponse.data.access_token;
        console.log("Optimizely API client authenticated successfully.");
      } else {
        throw new Error("Failed to retrieve access token.");
      }*/
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  }

  // Returns the singleton instance of the OptimizelyClient
  public static getInstance(): OptimizelyClient {
    if (!OptimizelyClient.instance) {
      OptimizelyClient.instance = new OptimizelyClient();
    }
    return OptimizelyClient.instance;
  }

  // Retrieves the Api client instance to make requests
  public getApiClient(): APIType<unknown> {
    return this.apiClient;
  }
}

export default OptimizelyClient;
