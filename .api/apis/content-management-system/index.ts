import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'content-management-system/preview2 (api/6.1.2)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Lists all changeset using the provided options.
   *
   * @summary List changeset
   * @throws FetchError<403, types.ChangesetsListResponse403> Forbidden
   */
  changesets_List(metadata?: types.ChangesetsListMetadataParam): Promise<FetchResponse<200, types.ChangesetsListResponse200>> {
    return this.core.fetch('/changesets', 'get', metadata);
  }

  /**
   * Creates a new changeset.
   *
   * @summary Create changeset
   * @throws FetchError<400, types.ChangesetsCreateResponse400> Bad Request
   * @throws FetchError<403, types.ChangesetsCreateResponse403> Forbidden
   */
  changesets_Create(body: types.ChangesetsCreateBodyParam): Promise<FetchResponse<200, types.ChangesetsCreateResponse200>> {
    return this.core.fetch('/changesets', 'post', body);
  }

  /**
   * Gets the changeset with the provided key.
   *
   * @summary Get changeset
   * @throws FetchError<403, types.ChangesetsGetResponse403> Forbidden
   */
  changesets_Get(metadata: types.ChangesetsGetMetadataParam): Promise<FetchResponse<200, types.ChangesetsGetResponse200>> {
    return this.core.fetch('/changesets/{key}', 'get', metadata);
  }

  /**
   * Deletes the changeset with the provided key. If a changeset with the provided key does
   * not exist an error is returned.
   *
   * @summary Delete changeset
   * @throws FetchError<400, types.ChangesetsDeleteResponse400> Bad Request
   * @throws FetchError<403, types.ChangesetsDeleteResponse403> Forbidden
   */
  changesets_Delete(metadata: types.ChangesetsDeleteMetadataParam): Promise<FetchResponse<200, types.ChangesetsDeleteResponse200>> {
    return this.core.fetch('/changesets/{key}', 'delete', metadata);
  }

  /**
   * Creates or replaces a changeset. If a changeset with the provided key exist it is
   * replaced.
   * Otherwise a new changeset is created.
   *
   * @summary Create or replace changeset
   * @throws FetchError<400, types.ChangesetsPutResponse400> Bad Request
   * @throws FetchError<403, types.ChangesetsPutResponse403> Forbidden
   */
  changesets_Put(body: types.ChangesetsPutBodyParam, metadata: types.ChangesetsPutMetadataParam): Promise<FetchResponse<200, types.ChangesetsPutResponse200>> {
    return this.core.fetch('/changesets/{key}', 'put', body, metadata);
  }

  /**
   * Gets the changeset item for the specified content reference.
   *
   * @summary Get changeset item
   * @throws FetchError<403, types.ChangesetsGetItemResponse403> Forbidden
   */
  changesets_GetItem(metadata: types.ChangesetsGetItemMetadataParam): Promise<FetchResponse<200, types.ChangesetsGetItemResponse200>> {
    return this.core.fetch('/changesets/{changeset}/items/{key}/versions/{version}', 'get', metadata);
  }

  /**
   * Deletes the specified changeset item from the changeset.
   *
   * @summary Delete changeset item
   * @throws FetchError<400, types.ChangesetsDeleteItemResponse400> Bad Request
   * @throws FetchError<403, types.ChangesetsDeleteItemResponse403> Forbidden
   */
  changesets_DeleteItem(metadata: types.ChangesetsDeleteItemMetadataParam): Promise<FetchResponse<200, types.ChangesetsDeleteItemResponse200>> {
    return this.core.fetch('/changesets/{changeset}/items/{key}/versions/{version}', 'delete', metadata);
  }

  /**
   * Lists the available changeset items for the specified changeset using
   * the provided options.
   *
   * @summary List changeset items
   * @throws FetchError<403, types.ChangesetsListItemsResponse403> Forbidden
   */
  changesets_ListItems(metadata: types.ChangesetsListItemsMetadataParam): Promise<FetchResponse<200, types.ChangesetsListItemsResponse200>> {
    return this.core.fetch('/changesets/{changeset}/items', 'get', metadata);
  }

  /**
   * Creates the given changeset item.
   *
   * @summary Create changeset item
   * @throws FetchError<400, types.ChangesetsCreateItemResponse400> Bad Request
   * @throws FetchError<403, types.ChangesetsCreateItemResponse403> Forbidden
   */
  changesets_CreateItem(body: types.ChangesetsCreateItemBodyParam, metadata: types.ChangesetsCreateItemMetadataParam): Promise<FetchResponse<200, types.ChangesetsCreateItemResponse200>> {
    return this.core.fetch('/changesets/{changeset}/items', 'post', body, metadata);
  }

  /**
   * Updates the given changeset item.
   *
   * @summary Update changeset item
   * @throws FetchError<400, types.ChangesetsUpdateItemResponse400> Bad Request
   * @throws FetchError<403, types.ChangesetsUpdateItemResponse403> Forbidden
   */
  changesets_UpdateItem(body: types.ChangesetsUpdateItemBodyParam, metadata: types.ChangesetsUpdateItemMetadataParam): Promise<FetchResponse<200, types.ChangesetsUpdateItemResponse200>> {
    return this.core.fetch('/changesets/{changeset}/items/{contentKey}/versions/{contentVersion}', 'put', body, metadata);
  }

  /**
   * Create a new content item.
   *
   * @summary Create content
   * @throws FetchError<400, types.ContentCreateResponse400> Bad Request
   * @throws FetchError<403, types.ContentCreateResponse403> Forbidden
   */
  content_Create(body: types.ContentCreateBodyParam, metadata?: types.ContentCreateMetadataParam): Promise<FetchResponse<201, types.ContentCreateResponse201>> {
    return this.core.fetch('/content', 'post', body, metadata);
  }

  /**
   * Get shared metadata about the content instance with the provided key.
   *
   * @summary Get content
   * @throws FetchError<403, types.ContentGetMetadataResponse403> Forbidden
   */
  content_GetMetadata(metadata: types.ContentGetMetadataMetadataParam): Promise<FetchResponse<200, types.ContentGetMetadataResponse200>> {
    return this.core.fetch('/content/{key}', 'get', metadata);
  }

  /**
   * Update an existing content item. If a content item with the provided key does not exist
   * an error is returned.
   *
   * @summary Update content
   * @throws FetchError<400, types.ContentPatchMetadataResponse400> Bad Request
   * @throws FetchError<403, types.ContentPatchMetadataResponse403> Forbidden
   */
  content_PatchMetadata(body: types.ContentPatchMetadataBodyParam, metadata: types.ContentPatchMetadataMetadataParam): Promise<FetchResponse<200, types.ContentPatchMetadataResponse200>> {
    return this.core.fetch('/content/{key}', 'patch', body, metadata);
  }

  /**
   * Deletes the content item with the provided key. If a content item with the provided key
   * does not exist an error is returned.
   *
   * @summary Delete content
   * @throws FetchError<400, types.ContentDeleteResponse400> Bad Request
   * @throws FetchError<403, types.ContentDeleteResponse403> Forbidden
   */
  content_Delete(metadata: types.ContentDeleteMetadataParam): Promise<FetchResponse<200, types.ContentDeleteResponse200>> {
    return this.core.fetch('/content/{key}', 'delete', metadata);
  }

  /**
   * Get the content path with the provided key.
   *
   * @summary Get content path
   * @throws FetchError<403, types.ContentGetPathResponse403> Forbidden
   */
  content_GetPath(metadata: types.ContentGetPathMetadataParam): Promise<FetchResponse<200, types.ContentGetPathResponse200>> {
    return this.core.fetch('/content/{key}/path', 'get', metadata);
  }

  /**
   * List the content items located in a specific container.
   *
   * @summary List content in container
   * @throws FetchError<403, types.ContentListItemsResponse403> Forbidden
   */
  content_ListItems(metadata: types.ContentListItemsMetadataParam): Promise<FetchResponse<200, types.ContentListItemsResponse200>> {
    return this.core.fetch('/content/{key}/items', 'get', metadata);
  }

  /**
   * List the assets that belongs to a content instance.
   *
   * @summary List assets
   * @throws FetchError<403, types.ContentListAssetsResponse403> Forbidden
   */
  content_ListAssets(metadata: types.ContentListAssetsMetadataParam): Promise<FetchResponse<200, types.ContentListAssetsResponse200>> {
    return this.core.fetch('/content/{key}/assets', 'get', metadata);
  }

  /**
   * Create a copy of the content item with the provided key.
   *
   * @summary Copy content
   * @throws FetchError<400, types.ContentCopyResponse400> Bad Request
   * @throws FetchError<403, types.ContentCopyResponse403> Forbidden
   */
  content_Copy(body: types.ContentCopyBodyParam, metadata: types.ContentCopyMetadataParam): Promise<FetchResponse<200, types.ContentCopyResponse200>>;
  content_Copy(metadata: types.ContentCopyMetadataParam): Promise<FetchResponse<200, types.ContentCopyResponse200>>;
  content_Copy(body?: types.ContentCopyBodyParam | types.ContentCopyMetadataParam, metadata?: types.ContentCopyMetadataParam): Promise<FetchResponse<200, types.ContentCopyResponse200>> {
    return this.core.fetch('/content/{key}:copy', 'post', body, metadata);
  }

  /**
   * Restore the deleted content item with the provided key. If a content item with the
   * provided key is not deleted an error is returned.
   *
   * @summary Restore content
   * @throws FetchError<400, types.ContentUndeleteResponse400> Bad Request
   * @throws FetchError<403, types.ContentUndeleteResponse403> Forbidden
   */
  content_Undelete(metadata: types.ContentUndeleteMetadataParam): Promise<FetchResponse<200, types.ContentUndeleteResponse200>> {
    return this.core.fetch('/content/{key}:undelete', 'post', metadata);
  }

  /**
   * List content versions based on the provided query options.
   *
   * @summary Query versions
   * @throws FetchError<403, types.ContentListAllVersionsResponse403> Forbidden
   */
  content_ListAllVersions(metadata?: types.ContentListAllVersionsMetadataParam): Promise<FetchResponse<200, types.ContentListAllVersionsResponse200>> {
    return this.core.fetch('/content/versions', 'get', metadata);
  }

  /**
   * List versions of the content item with the provided key and the provided options.
   *
   * @summary List versions
   * @throws FetchError<403, types.ContentListVersionsResponse403> Forbidden
   */
  content_ListVersions(metadata: types.ContentListVersionsMetadataParam): Promise<FetchResponse<200, types.ContentListVersionsResponse200>> {
    return this.core.fetch('/content/{key}/versions', 'get', metadata);
  }

  /**
   * Create a new version of a content item.
   *
   * @summary Create version
   * @throws FetchError<400, types.ContentCreateVersionResponse400> Bad Request
   * @throws FetchError<403, types.ContentCreateVersionResponse403> Forbidden
   */
  content_CreateVersion(body: types.ContentCreateVersionBodyParam, metadata: types.ContentCreateVersionMetadataParam): Promise<FetchResponse<201, types.ContentCreateVersionResponse201>> {
    return this.core.fetch('/content/{key}/versions', 'post', body, metadata);
  }

  /**
   * Deletes the content item with the provided key. If a content item with the provided key
   * does not exist an error is returned.
   *
   * @summary Delete locale
   * @throws FetchError<400, types.ContentDeleteLocaleResponse400> Bad Request
   * @throws FetchError<403, types.ContentDeleteLocaleResponse403> Forbidden
   */
  content_DeleteLocale(metadata: types.ContentDeleteLocaleMetadataParam): Promise<FetchResponse<200, types.ContentDeleteLocaleResponse200>> {
    return this.core.fetch('/content/{key}/versions', 'delete', metadata);
  }

  /**
   * Get the content item with the provided key and version.
   *
   * @summary Get version
   * @throws FetchError<403, types.ContentGetVersionResponse403> Forbidden
   */
  content_GetVersion(metadata: types.ContentGetVersionMetadataParam): Promise<FetchResponse<200, types.ContentGetVersionResponse200>> {
    return this.core.fetch('/content/{key}/versions/{version}', 'get', metadata);
  }

  /**
   * Update an existing content item. If a content item with the provided key does not exist
   * an error is returned.
   *
   * @summary Update version
   * @throws FetchError<400, types.ContentPatchVersionResponse400> Bad Request
   * @throws FetchError<403, types.ContentPatchVersionResponse403> Forbidden
   */
  content_PatchVersion(body: types.ContentPatchVersionBodyParam, metadata: types.ContentPatchVersionMetadataParam): Promise<FetchResponse<200, types.ContentPatchVersionResponse200>> {
    return this.core.fetch('/content/{key}/versions/{version}', 'patch', body, metadata);
  }

  /**
   * Deletes the content item with the provided key. If a content item with the provided key
   * does not exist an error is returned.
   *
   * @summary Delete version
   * @throws FetchError<400, types.ContentDeleteVersionResponse400> Bad Request
   * @throws FetchError<403, types.ContentDeleteVersionResponse403> Forbidden
   */
  content_DeleteVersion(metadata: types.ContentDeleteVersionMetadataParam): Promise<FetchResponse<200, types.ContentDeleteVersionResponse200>> {
    return this.core.fetch('/content/{key}/versions/{version}', 'delete', metadata);
  }

  /**
   * List content types using the provided options.
   *
   * @summary List content types
   * @throws FetchError<403, types.ContentTypesListResponse403> Forbidden
   */
  contentTypes_List(metadata?: types.ContentTypesListMetadataParam): Promise<FetchResponse<200, types.ContentTypesListResponse200>> {
    return this.core.fetch('/contenttypes', 'get', metadata);
  }

  /**
   * Create a new content type.
   *
   * @summary Create content type
   * @throws FetchError<400, types.ContentTypesCreateResponse400> Bad Request
   * @throws FetchError<403, types.ContentTypesCreateResponse403> Forbidden
   */
  contentTypes_Create(body: types.ContentTypesCreateBodyParam): Promise<FetchResponse<200, types.ContentTypesCreateResponse200>> {
    return this.core.fetch('/contenttypes', 'post', body);
  }

  /**
   * Get the content type with the provided key.
   *
   * @summary Get content type
   * @throws FetchError<403, types.ContentTypesGetResponse403> Forbidden
   */
  contentTypes_Get(metadata: types.ContentTypesGetMetadataParam): Promise<FetchResponse<200, types.ContentTypesGetResponse200>> {
    return this.core.fetch('/contenttypes/{key}', 'get', metadata);
  }

  /**
   * Create or replace a content type. If a content type with the provided key exist it is
   * replaced.
   * Otherwise a new content type is created.
   *
   * @summary Create or replace content type
   * @throws FetchError<400, types.ContentTypesPutResponse400> Bad Request
   * @throws FetchError<403, types.ContentTypesPutResponse403> Forbidden
   */
  contentTypes_Put(body: types.ContentTypesPutBodyParam, metadata: types.ContentTypesPutMetadataParam): Promise<FetchResponse<200, types.ContentTypesPutResponse200>> {
    return this.core.fetch('/contenttypes/{key}', 'put', body, metadata);
  }

  /**
   * Update an existing content type. If a content type with the provided key does not exist
   * an error is returned.
   *
   * @summary Update content type
   * @throws FetchError<400, types.ContentTypesPatchResponse400> Bad Request
   * @throws FetchError<403, types.ContentTypesPatchResponse403> Forbidden
   */
  contentTypes_Patch(body: types.ContentTypesPatchBodyParam, metadata: types.ContentTypesPatchMetadataParam): Promise<FetchResponse<200, types.ContentTypesPatchResponse200>> {
    return this.core.fetch('/contenttypes/{key}', 'patch', body, metadata);
  }

  /**
   * Deletes the content type with the provided key. If a content type with the provided key
   * does not exist an error is returned.
   *
   * @summary Delete content type
   * @throws FetchError<400, types.ContentTypesDeleteResponse400> Bad Request
   * @throws FetchError<403, types.ContentTypesDeleteResponse403> Forbidden
   */
  contentTypes_Delete(metadata: types.ContentTypesDeleteMetadataParam): Promise<FetchResponse<200, types.ContentTypesDeleteResponse200>> {
    return this.core.fetch('/contenttypes/{key}', 'delete', metadata);
  }

  /**
   * List display templates using the provided options.
   *
   * @summary List display templates
   * @throws FetchError<403, types.DisplayTemplatesListResponse403> Forbidden
   */
  displayTemplates_List(metadata?: types.DisplayTemplatesListMetadataParam): Promise<FetchResponse<200, types.DisplayTemplatesListResponse200>> {
    return this.core.fetch('/displaytemplates', 'get', metadata);
  }

  /**
   * Create a new display template.
   *
   * @summary Create display template
   * @throws FetchError<400, types.DisplayTemplatesCreateResponse400> Bad Request
   * @throws FetchError<403, types.DisplayTemplatesCreateResponse403> Forbidden
   */
  displayTemplates_Create(body: types.DisplayTemplatesCreateBodyParam): Promise<FetchResponse<200, types.DisplayTemplatesCreateResponse200>> {
    return this.core.fetch('/displaytemplates', 'post', body);
  }

  /**
   * Get the display template with the provided key.
   *
   * @summary Get display template
   * @throws FetchError<403, types.DisplayTemplatesGetResponse403> Forbidden
   */
  displayTemplates_Get(metadata: types.DisplayTemplatesGetMetadataParam): Promise<FetchResponse<200, types.DisplayTemplatesGetResponse200>> {
    return this.core.fetch('/displaytemplates/{key}', 'get', metadata);
  }

  /**
   * Create or replace a display template. If a display template with the provided key exist
   * it is replaced.
   * Otherwise a new display template is created.
   *
   * @summary Create or replace a display template
   * @throws FetchError<400, types.DisplayTemplatesPutResponse400> Bad Request
   * @throws FetchError<403, types.DisplayTemplatesPutResponse403> Forbidden
   */
  displayTemplates_Put(body: types.DisplayTemplatesPutBodyParam, metadata: types.DisplayTemplatesPutMetadataParam): Promise<FetchResponse<200, types.DisplayTemplatesPutResponse200>> {
    return this.core.fetch('/displaytemplates/{key}', 'put', body, metadata);
  }

  /**
   * Update an existing display template.
   *
   * @summary Update display template
   * @throws FetchError<400, types.DisplayTemplatesPatchResponse400> Bad Request
   * @throws FetchError<403, types.DisplayTemplatesPatchResponse403> Forbidden
   */
  displayTemplates_Patch(body: types.DisplayTemplatesPatchBodyParam, metadata: types.DisplayTemplatesPatchMetadataParam): Promise<FetchResponse<200, types.DisplayTemplatesPatchResponse200>> {
    return this.core.fetch('/displaytemplates/{key}', 'patch', body, metadata);
  }

  /**
   * Deletes the display template with the provided key.
   *
   * @summary Delete display template
   * @throws FetchError<400, types.DisplayTemplatesDeleteResponse400> Bad Request
   * @throws FetchError<403, types.DisplayTemplatesDeleteResponse403> Forbidden
   */
  displayTemplates_Delete(metadata: types.DisplayTemplatesDeleteMetadataParam): Promise<FetchResponse<200, types.DisplayTemplatesDeleteResponse200>> {
    return this.core.fetch('/displaytemplates/{key}', 'delete', metadata);
  }

  /**
   * Request an access token. This endpoint only supports the 'client_credentials' grant type
   *
   * and will only issue short-lived tokens.
   *
   * @summary Request access token
   * @throws FetchError<400, types.OauthTokenResponse400> Bad Request
   */
  oauth_Token(body: types.OauthTokenBodyParam): Promise<FetchResponse<200, types.OauthTokenResponse200>> {
    return this.core.fetch('/oauth/token', 'post', body);
  }

  /**
   * Get a package job status.
   *
   * @summary Get job status
   * @throws FetchError<403, types.PackagesGetResponse403> Forbidden
   */
  packages_Get(metadata: types.PackagesGetMetadataParam): Promise<FetchResponse<200, types.PackagesGetResponse200>> {
    return this.core.fetch('/packages/{key}', 'get', metadata);
  }

  /**
   * Export a data package.
   *
   * @summary Export package
   * @throws FetchError<403, types.PackagesExportResponse403> Forbidden
   */
  packages_Export(metadata?: types.PackagesExportMetadataParam): Promise<FetchResponse<200, types.PackagesExportResponse200>> {
    return this.core.fetch('/packages', 'get', metadata);
  }

  /**
   * Import a data package.
   *
   * @summary Import package
   * @throws FetchError<400, types.PackagesImportResponse400> Bad Request
   * @throws FetchError<403, types.PackagesImportResponse403> Forbidden
   */
  packages_Import(body?: types.PackagesImportBodyParam, metadata?: types.PackagesImportMetadataParam): Promise<FetchResponse<200, types.PackagesImportResponse200> | FetchResponse<202, types.PackagesImportResponse202>> {
    return this.core.fetch('/packages', 'post', body, metadata);
  }

  /**
   * List all property formats using the provided options.
   *
   * @summary List property formats
   * @throws FetchError<403, types.PropertyFormatsListResponse403> Forbidden
   */
  propertyFormats_List(metadata?: types.PropertyFormatsListMetadataParam): Promise<FetchResponse<200, types.PropertyFormatsListResponse200>> {
    return this.core.fetch('/propertyformats', 'get', metadata);
  }

  /**
   * Get the property format with the provided key.
   *
   * @summary Get property format
   * @throws FetchError<403, types.PropertyFormatsGetResponse403> Forbidden
   */
  propertyFormats_Get(metadata: types.PropertyFormatsGetMetadataParam): Promise<FetchResponse<200, types.PropertyFormatsGetResponse200>> {
    return this.core.fetch('/propertyformats/{key}', 'get', metadata);
  }

  /**
   * List property groups using the provided options.
   *
   * @summary List property groups
   * @throws FetchError<403, types.PropertyGroupsListResponse403> Forbidden
   */
  propertyGroups_List(metadata?: types.PropertyGroupsListMetadataParam): Promise<FetchResponse<200, types.PropertyGroupsListResponse200>> {
    return this.core.fetch('/propertygroups', 'get', metadata);
  }

  /**
   * Create a new property group.
   *
   * @summary Create property group
   * @throws FetchError<400, types.PropertyGroupsCreateResponse400> Bad Request
   * @throws FetchError<403, types.PropertyGroupsCreateResponse403> Forbidden
   */
  propertyGroups_Create(body: types.PropertyGroupsCreateBodyParam): Promise<FetchResponse<200, types.PropertyGroupsCreateResponse200>> {
    return this.core.fetch('/propertygroups', 'post', body);
  }

  /**
   * Get the property group with the provided key.
   *
   * @summary Get property group
   * @throws FetchError<403, types.PropertyGroupsGetResponse403> Forbidden
   */
  propertyGroups_Get(metadata: types.PropertyGroupsGetMetadataParam): Promise<FetchResponse<200, types.PropertyGroupsGetResponse200>> {
    return this.core.fetch('/propertygroups/{key}', 'get', metadata);
  }

  /**
   * Create or replace a property group. If a property group with the provided key exist it
   * is replaced.
   * Otherwise a new property group is created.
   *
   * @summary Create or replace property group
   * @throws FetchError<400, types.PropertyGroupsPutResponse400> Bad Request
   * @throws FetchError<403, types.PropertyGroupsPutResponse403> Forbidden
   */
  propertyGroups_Put(body: types.PropertyGroupsPutBodyParam, metadata: types.PropertyGroupsPutMetadataParam): Promise<FetchResponse<200, types.PropertyGroupsPutResponse200>> {
    return this.core.fetch('/propertygroups/{key}', 'put', body, metadata);
  }

  /**
   * Update an existing property group.
   *
   * @summary Update property group
   * @throws FetchError<400, types.PropertyGroupsPatchResponse400> Bad Request
   * @throws FetchError<403, types.PropertyGroupsPatchResponse403> Forbidden
   */
  propertyGroups_Patch(body: types.PropertyGroupsPatchBodyParam, metadata: types.PropertyGroupsPatchMetadataParam): Promise<FetchResponse<200, types.PropertyGroupsPatchResponse200>> {
    return this.core.fetch('/propertygroups/{key}', 'patch', body, metadata);
  }

  /**
   * Deletes the property group with the provided key.
   *
   * @summary Delete property group
   * @throws FetchError<400, types.PropertyGroupsDeleteResponse400> Bad Request
   * @throws FetchError<403, types.PropertyGroupsDeleteResponse403> Forbidden
   */
  propertyGroups_Delete(metadata: types.PropertyGroupsDeleteMetadataParam): Promise<FetchResponse<200, types.PropertyGroupsDeleteResponse200>> {
    return this.core.fetch('/propertygroups/{key}', 'delete', metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { ChangesetsCreateBodyParam, ChangesetsCreateItemBodyParam, ChangesetsCreateItemMetadataParam, ChangesetsCreateItemResponse200, ChangesetsCreateItemResponse400, ChangesetsCreateItemResponse403, ChangesetsCreateResponse200, ChangesetsCreateResponse400, ChangesetsCreateResponse403, ChangesetsDeleteItemMetadataParam, ChangesetsDeleteItemResponse200, ChangesetsDeleteItemResponse400, ChangesetsDeleteItemResponse403, ChangesetsDeleteMetadataParam, ChangesetsDeleteResponse200, ChangesetsDeleteResponse400, ChangesetsDeleteResponse403, ChangesetsGetItemMetadataParam, ChangesetsGetItemResponse200, ChangesetsGetItemResponse403, ChangesetsGetMetadataParam, ChangesetsGetResponse200, ChangesetsGetResponse403, ChangesetsListItemsMetadataParam, ChangesetsListItemsResponse200, ChangesetsListItemsResponse403, ChangesetsListMetadataParam, ChangesetsListResponse200, ChangesetsListResponse403, ChangesetsPutBodyParam, ChangesetsPutMetadataParam, ChangesetsPutResponse200, ChangesetsPutResponse400, ChangesetsPutResponse403, ChangesetsUpdateItemBodyParam, ChangesetsUpdateItemMetadataParam, ChangesetsUpdateItemResponse200, ChangesetsUpdateItemResponse400, ChangesetsUpdateItemResponse403, ContentCopyBodyParam, ContentCopyMetadataParam, ContentCopyResponse200, ContentCopyResponse400, ContentCopyResponse403, ContentCreateBodyParam, ContentCreateMetadataParam, ContentCreateResponse201, ContentCreateResponse400, ContentCreateResponse403, ContentCreateVersionBodyParam, ContentCreateVersionMetadataParam, ContentCreateVersionResponse201, ContentCreateVersionResponse400, ContentCreateVersionResponse403, ContentDeleteLocaleMetadataParam, ContentDeleteLocaleResponse200, ContentDeleteLocaleResponse400, ContentDeleteLocaleResponse403, ContentDeleteMetadataParam, ContentDeleteResponse200, ContentDeleteResponse400, ContentDeleteResponse403, ContentDeleteVersionMetadataParam, ContentDeleteVersionResponse200, ContentDeleteVersionResponse400, ContentDeleteVersionResponse403, ContentGetMetadataMetadataParam, ContentGetMetadataResponse200, ContentGetMetadataResponse403, ContentGetPathMetadataParam, ContentGetPathResponse200, ContentGetPathResponse403, ContentGetVersionMetadataParam, ContentGetVersionResponse200, ContentGetVersionResponse403, ContentListAllVersionsMetadataParam, ContentListAllVersionsResponse200, ContentListAllVersionsResponse403, ContentListAssetsMetadataParam, ContentListAssetsResponse200, ContentListAssetsResponse403, ContentListItemsMetadataParam, ContentListItemsResponse200, ContentListItemsResponse403, ContentListVersionsMetadataParam, ContentListVersionsResponse200, ContentListVersionsResponse403, ContentPatchMetadataBodyParam, ContentPatchMetadataMetadataParam, ContentPatchMetadataResponse200, ContentPatchMetadataResponse400, ContentPatchMetadataResponse403, ContentPatchVersionBodyParam, ContentPatchVersionMetadataParam, ContentPatchVersionResponse200, ContentPatchVersionResponse400, ContentPatchVersionResponse403, ContentTypesCreateBodyParam, ContentTypesCreateResponse200, ContentTypesCreateResponse400, ContentTypesCreateResponse403, ContentTypesDeleteMetadataParam, ContentTypesDeleteResponse200, ContentTypesDeleteResponse400, ContentTypesDeleteResponse403, ContentTypesGetMetadataParam, ContentTypesGetResponse200, ContentTypesGetResponse403, ContentTypesListMetadataParam, ContentTypesListResponse200, ContentTypesListResponse403, ContentTypesPatchBodyParam, ContentTypesPatchMetadataParam, ContentTypesPatchResponse200, ContentTypesPatchResponse400, ContentTypesPatchResponse403, ContentTypesPutBodyParam, ContentTypesPutMetadataParam, ContentTypesPutResponse200, ContentTypesPutResponse400, ContentTypesPutResponse403, ContentUndeleteMetadataParam, ContentUndeleteResponse200, ContentUndeleteResponse400, ContentUndeleteResponse403, DisplayTemplatesCreateBodyParam, DisplayTemplatesCreateResponse200, DisplayTemplatesCreateResponse400, DisplayTemplatesCreateResponse403, DisplayTemplatesDeleteMetadataParam, DisplayTemplatesDeleteResponse200, DisplayTemplatesDeleteResponse400, DisplayTemplatesDeleteResponse403, DisplayTemplatesGetMetadataParam, DisplayTemplatesGetResponse200, DisplayTemplatesGetResponse403, DisplayTemplatesListMetadataParam, DisplayTemplatesListResponse200, DisplayTemplatesListResponse403, DisplayTemplatesPatchBodyParam, DisplayTemplatesPatchMetadataParam, DisplayTemplatesPatchResponse200, DisplayTemplatesPatchResponse400, DisplayTemplatesPatchResponse403, DisplayTemplatesPutBodyParam, DisplayTemplatesPutMetadataParam, DisplayTemplatesPutResponse200, DisplayTemplatesPutResponse400, DisplayTemplatesPutResponse403, OauthTokenBodyParam, OauthTokenResponse200, OauthTokenResponse400, PackagesExportMetadataParam, PackagesExportResponse200, PackagesExportResponse403, PackagesGetMetadataParam, PackagesGetResponse200, PackagesGetResponse403, PackagesImportBodyParam, PackagesImportMetadataParam, PackagesImportResponse200, PackagesImportResponse202, PackagesImportResponse400, PackagesImportResponse403, PropertyFormatsGetMetadataParam, PropertyFormatsGetResponse200, PropertyFormatsGetResponse403, PropertyFormatsListMetadataParam, PropertyFormatsListResponse200, PropertyFormatsListResponse403, PropertyGroupsCreateBodyParam, PropertyGroupsCreateResponse200, PropertyGroupsCreateResponse400, PropertyGroupsCreateResponse403, PropertyGroupsDeleteMetadataParam, PropertyGroupsDeleteResponse200, PropertyGroupsDeleteResponse400, PropertyGroupsDeleteResponse403, PropertyGroupsGetMetadataParam, PropertyGroupsGetResponse200, PropertyGroupsGetResponse403, PropertyGroupsListMetadataParam, PropertyGroupsListResponse200, PropertyGroupsListResponse403, PropertyGroupsPatchBodyParam, PropertyGroupsPatchMetadataParam, PropertyGroupsPatchResponse200, PropertyGroupsPatchResponse400, PropertyGroupsPatchResponse403, PropertyGroupsPutBodyParam, PropertyGroupsPutMetadataParam, PropertyGroupsPutResponse200, PropertyGroupsPutResponse400, PropertyGroupsPutResponse403 } from './types';
