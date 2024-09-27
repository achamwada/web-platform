import {
  ContentfulClientApi,
  createClient,
  EntryCollection,
  EntrySkeletonType,
} from "contentful";

interface IContentfulConfig {
  space: string;
  accessToken: string;
  environment: string;
}

export class ContentfulService {
  // @ts-ignore
  private client: ContentfulClientApi;

  constructor(config: IContentfulConfig) {
    this.client = createClient(config);
  }

  async getEntries<T extends EntrySkeletonType>(
    contentTypeId: string,
    contentEntryKey?: string,
    query: object = {}
  ): Promise<EntryCollection<T>> {
    try {
      let dynamicQuery: { [key: string]: any } = {
        content_type: contentTypeId,
        include: 10,
        ...query,
      };

      if (contentEntryKey) {
        dynamicQuery["fields.contentEntryKey"] = contentEntryKey;
      }

      return await this.client.getEntries<T>(dynamicQuery);
    } catch (error) {
      console.error("Error fetching entries:", error);
      throw error;
    }
  }

  async getEntry<T>(
    contentTypeId: string,
    contentEntryKey: string
  ): Promise<T | null> {
    try {
      const dynamicQuery: { [key: string]: any } = {
        content_type: contentTypeId,
        "fields.contentEntryKey": contentEntryKey,
        include: 10,
        limit: 1,
      };

      const { items } = await this.client.getEntries<T>(dynamicQuery);

      if (items.length === 0) {
        return {
          statusCode: 404,
          body: { message: "Entry not found" },
        } as T;
      }

      return items[0];
    } catch (error) {
      console.error(`Error fetching entry with ID ${contentEntryKey}:`, error);
      return null;
    }
  }
}
