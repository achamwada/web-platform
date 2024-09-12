/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** Describes a property that can contain a reference to binary data. */
export type BinaryProperty = ContentTypeProperty & {
  /** Instruction for generating an alternative image from the main binary of an image content item. */
  imageDescriptor?: ImageDescriptor;
};

/** Describes a property that can contain a boolean value. */
export type BooleanProperty = ContentTypeProperty & object;

/** A writable implementation of an Changeset. */
export interface Changeset {
  /**
   * The unique key of this Changeset
   * @minLength 1
   * @maxLength 255
   */
  key: string;
  /**
   * The source of this Changeset
   * @maxLength 255
   */
  source?: string;
  /**
   * The name of this Changeset.
   * @minLength 1
   * @maxLength 255
   */
  displayName: string;
  /**
   * A timestamp indicating when this changeset was first created.
   * @format date-time
   */
  created?: string;
  /** The username of the user that created this changeset. */
  createdBy?: string;
  /** @format date-time */
  lastModified?: string;
}

/** A writable implementation of an ChangesetItem. */
export interface ChangesetItem {
  /** A reference to a specific content instance. */
  reference: ContentReference;
  /** Gets/sets item category. */
  category?: string;
}

export interface ChangesetItemPage {
  /** The items in this paged collection. */
  items?: ChangesetItem[];
  /**
   * The zero-based index of the current page.
   * @format int32
   */
  pageIndex?: number;
  /**
   * The number of item in each page. Not necessarily the same as the number of items in this page.
   * @format int32
   */
  pageSize?: number;
  /**
   * The estimated total number of items in the collection. May be omitted if the total item count is unknown.
   * @format int32
   */
  totalItemCount?: number;
}

export interface ChangesetPage {
  /** The items in this paged collection. */
  items?: Changeset[];
  /**
   * The zero-based index of the current page.
   * @format int32
   */
  pageIndex?: number;
  /**
   * The number of item in each page. Not necessarily the same as the number of items in this page.
   * @format int32
   */
  pageSize?: number;
  /**
   * The estimated total number of items in the collection. May be omitted if the total item count is unknown.
   * @format int32
   */
  totalItemCount?: number;
}

/** Describes a property list item that can contain a component instance of a specific type. */
export type ComponentListItem = ListPropertyItem & {
  /**
   * @minLength 1
   * @maxLength 50
   */
  contentType: string;
};

/** Describes a property that can contain a component instance of a specific type. */
export type ComponentProperty = ContentTypeProperty & {
  /**
   * @minLength 1
   * @maxLength 50
   */
  contentType: string;
};

/** Represent the base type of a ContentType. */
export enum ContentBaseType {
  Page = "page",
  Component = "component",
  Media = "media",
  Image = "image",
  Video = "video",
  Folder = "folder",
  Experience = "experience",
  Section = "section",
  Element = "element",
}

/** Represents a content component. */
export interface ContentComponent {
  /** The name of the content component. If Reference is set, the name is automatically set to the name of the referenced content. */
  name?: string;
  /** An optional display option for the content component. */
  displayOption?: string;
  /** An optional group for the personalizable component. */
  segmentationGroup?: string;
  /** Specifies the settings for the content component. */
  segments?: string[];
  /**
   * A reference to the content of this component.
   * Cannot be assigned together with Content.
   */
  reference?: string;
  /** The key of the content type that this is an embedded instance of. */
  contentType?: string;
  /** Dictionary with all custom properties as specified by associated ContentType */
  content?: any;
}

/** Represents a version of a content item. */
export interface ContentItem {
  /** Set of content type properties. */
  properties?: Record<string, any>;
  /**
   * The key that identifies this content item.
   * @minLength 1
   */
  key: string;
  /** The locale of this content instance. */
  locale?: string;
  /** The version identifier of this content instance. */
  version?: string;
  /** The content type of this content item. */
  contentType?: string;
  /**
   * The display name of this content item.
   * @minLength 1
   * @maxLength 255
   */
  displayName: string;
  /**
   * Indicates a time when this content was published or should be published.
   * @format date-time
   */
  published?: string | null;
  /**
   * Indicates a time when this content expired or should expire.
   * @format date-time
   */
  expired?: string | null;
  /** Represent the different status values of a content version. */
  status?: VersionStatus;
  /**
   * Indicates a time when this content version should transition to published status. Must only be assigned when Status is set to Scheduled.
   * @format date-time
   */
  delayPublishUntil?: string | null;
  /** @format date-time */
  lastModified?: string;
  /** The username of the user that made the latest modification to this content instance. */
  lastModifiedBy?: string;
  /** The key that identifies the container content that this content item belongs to. */
  container?: string | null;
  /** The key that identifies the owner of this content. Content that is own by another content is also known as an asset. */
  owner?: string | null;
  /**
   * A string that represents the segment that should be used when routing or generate routes to the current content instance.
   * @maxLength 255
   */
  routeSegment?: string | null;
}

/** The response object for Page`1 when used ContentType are included. */
export interface ContentItemListWithContentTypes {
  /** The content types that are used by the content items in the response. */
  contentTypes?: ContentType[];
  /** The content items in this paged collection. */
  items?: ContentItem[];
  /**
   * The zero-based index of the current page.
   * @format int32
   */
  pageIndex?: number;
  /**
   * The number of item in each page. Not necessarily the same as the number of items in this page.
   * @format int32
   */
  pageSize?: number;
  /**
   * The estimated total number of items in the collection. May be omitted if the total item count is unknown.
   * @format int32
   */
  totalItemCount?: number;
}

export interface ContentItemPage {
  /** The items in this paged collection. */
  items?: ContentItem[];
  /**
   * The zero-based index of the current page.
   * @format int32
   */
  pageIndex?: number;
  /**
   * The number of item in each page. Not necessarily the same as the number of items in this page.
   * @format int32
   */
  pageSize?: number;
  /**
   * The estimated total number of items in the collection. May be omitted if the total item count is unknown.
   * @format int32
   */
  totalItemCount?: number;
}

/** The response object for ContentItem when used ContentType are included. */
export interface ContentItemWithContentTypes {
  /** The content types that are used by the content item in the response. */
  contentTypes?: ContentType[];
  /** Represents a version of a content item. */
  item?: ContentItem;
}

/** Describes a property list item that can hold a content item. */
export type ContentListItem = ListPropertyItem & {
  allowedTypes?: string[];
  restrictedTypes?: string[];
};

/** Describes information about a locale instance of a content item. */
export interface ContentLocaleInfo {
  /**
   * The display name of the content.
   * @example ""
   */
  displayName?: string;
  /**
   * The date and time when the first locale version for the content was created.
   * @format date-time
   * @example ""
   */
  created?: string;
  /**
   * The username of the user that created this locale version of content.
   * @example ""
   */
  createdBy?: string;
  /** Represent the different status values of a content locale. */
  status?: LocaleStatus;
}

/** Represents metadata about a content item. */
export interface ContentMetadata {
  /** The key that identifies this content. */
  key?: string;
  /** The content type of this content. */
  contentType?: string;
  /** The key that identifies the container content that this content belongs to. */
  container?: string | null;
  /** Indicates if the content contains any content items. */
  hasItems?: boolean;
  /** The key that identifies the owner of this content. Content that is own by another content is also known as an asset. */
  owner?: string | null;
  /** Set of locales that the content item has been created for. */
  locales?: Record<string, ContentLocaleInfo>;
  /**
   * A timestamp, which if provided, indicates when this content was deleted.
   * @format date-time
   */
  deleted?: string | null;
  /** The username of the user that deleted this content. */
  deletedBy?: string | null;
}

export interface ContentMetadataPage {
  /** The items in this paged collection. */
  items?: ContentMetadata[];
  /**
   * The zero-based index of the current page.
   * @format int32
   */
  pageIndex?: number;
  /**
   * The number of item in each page. Not necessarily the same as the number of items in this page.
   * @format int32
   */
  pageSize?: number;
  /**
   * The estimated total number of items in the collection. May be omitted if the total item count is unknown.
   * @format int32
   */
  totalItemCount?: number;
}

/** Describes a property that can contain a content item. */
export type ContentProperty = ContentTypeProperty & {
  allowedTypes?: string[];
  restrictedTypes?: string[];
};

/** A reference to a specific content instance. */
export interface ContentReference {
  /** The content key that identifies the content. */
  key?: string;
  /** The name of the content locale */
  locale?: string;
  /** The identifier of a specific version of the content. */
  version?: string;
}

/** Describes a property list item that can hold a reference to a content item. */
export type ContentReferenceListItem = ListPropertyItem & {
  allowedTypes?: string[];
  restrictedTypes?: string[];
};

/** Describes a property that can contain a reference to a content item. */
export type ContentReferenceProperty = ContentTypeProperty & {
  allowedTypes?: string[];
  restrictedTypes?: string[];
};

/** A writable implementation of an ContentType. */
export interface ContentType {
  /**
   * The key that identifies this ContentType.
   * @minLength 2
   * @maxLength 255
   * @pattern ^[A-Za-z][_0-9A-Za-z]+\z
   */
  key: string;
  /**
   * The display name of this ContentType.
   * @maxLength 255
   */
  displayName?: string;
  /**
   * A description of this ContentType.
   * @maxLength 255
   */
  description?: string;
  /** Represent the base type of a ContentType. */
  baseType?: ContentBaseType;
  /** A string that is used to indicate the source of this ContentType. */
  source?: string;
  /**
   * An value that is used to when sorting ContentType instances.
   * @format int32
   */
  sortOrder?: number;
  /**
   * Provides a set of features that content based on this ContentType supports.
   * This value is assigned based on the BaseType and cannot be modified.
   */
  features?: ContentTypeFeature[];
  /** Specifies how this ContentType can be used. */
  usage?: ContentTypeUsage[];
  /** Provides a set of content types that can be created in container of this type */
  mayContainTypes?: string[];
  /** Provides a set of media file extensions that this content type can handle. */
  mediaFileExtensions?: string[];
  /**
   * A timestamp indicating when this ContentType was first created.
   * @format date-time
   */
  created?: string;
  /** The username of the user that made the latest modification to this ContentType. */
  lastModifiedBy?: string;
  /**
   * Indicates the last time this content type was modified.
   * @format date-time
   */
  lastModified?: string;
  /** Dictionary with all custom properties of this ContentType. */
  properties?: Record<
    string,
    (
      | BinaryProperty
      | BooleanProperty
      | ComponentProperty
      | ContentProperty
      | ContentReferenceProperty
      | DateTimeProperty
      | FloatProperty
      | IntegerProperty
      | StringProperty
      | UrlProperty
      | JsonStringProperty
      | ListProperty
    ) & {
      /** Settings for the editor. */
      editorSettings?: Record<string, object>;
    }
  >;
}

/** Represent different features that a content type can have. */
export enum ContentTypeFeature {
  Localization = "localization",
  Versioning = "versioning",
  PublishPeriod = "publishPeriod",
  Routing = "routing",
  Binary = "binary",
}

export interface ContentTypePage {
  /** The items in this paged collection. */
  items?: ContentType[];
  /**
   * The zero-based index of the current page.
   * @format int32
   */
  pageIndex?: number;
  /**
   * The number of item in each page. Not necessarily the same as the number of items in this page.
   * @format int32
   */
  pageSize?: number;
  /**
   * The estimated total number of items in the collection. May be omitted if the total item count is unknown.
   * @format int32
   */
  totalItemCount?: number;
}

/** A writable implementation of an ContentTypeProperty. */
export interface ContentTypeProperty {
  /**
   * Represent the basic type that a PropertyFormat
   * is using for data storage and data transport.
   */
  type: PropertyDataType;
  /** The key of the PropertyFormat that this ContentTypeProperty is an instance of. */
  format?: string | null;
  /**
   * The display name of this ContentTypeProperty.
   * @maxLength 255
   */
  displayName?: string;
  /**
   * A description of this ContentTypeProperty.
   * @maxLength 2000
   */
  description?: string;
  /** Indicates if a property instance of this type must always be assigned a value. */
  required?: boolean;
  /**
   * Indicates if a property instance of this type should be localized for each locale
   * or if values are shared between all locales.
   */
  localized?: boolean;
  /**
   * A reference to the PropertyGroup that this ContentTypeProperty is part of.
   * If this value is empty, a group may be assigned by the system.
   */
  group?: string;
  /**
   * An value that is used to when sorting ContentTypeProperty instances.
   * @format int32
   */
  sortOrder?: number;
  /** Represent the indexing type of a ContentTypeProperty. */
  indexingType?: IndexingType;
  /** Editor used for managing this property. */
  editor?: string | null;
  /** Settings for the editor. */
  editorSettings?: Record<string, object>;
}

/** Represent the usage types for a ContentType. */
export enum ContentTypeUsage {
  Property = "property",
  Instance = "instance",
}

/** Options for copying content. */
export interface CopyContentOptions {
  /** Indicates if deleted content could be used as source. */
  allowDeleted?: boolean;
  /** Optional key of the container where the copied content should be placed. */
  container?: string | null;
  /** Optional key of the owner where the copied content should be placed. */
  owner?: string | null;
  /** Indicates if published versions of the content should keep their published status rather than being created as a draft version at the destination. */
  keepPublishedStatus?: boolean;
}

/** Describes a property list item that can contain a timestamp. */
export type DateTimeListItem = ListPropertyItem & {
  /** @format date-time */
  minimum?: string | null;
  /** @format date-time */
  maximum?: string | null;
};

/** Describes a property that can contain a timestamp. */
export type DateTimeProperty = ContentTypeProperty & {
  /** @format date-time */
  minimum?: string | null;
  /** @format date-time */
  maximum?: string | null;
};

/** Describes a setting for a display template. */
export interface DisplaySetting {
  /**
   * The display name of this display setting.
   * @minLength 1
   * @maxLength 255
   */
  displayName: string;
  /**
   * The suggested editor for this display setting.
   * @maxLength 50
   */
  editor?: string;
  /**
   * The sort order of this display setting within the template.
   * @format int32
   */
  sortOrder?: number;
  /** The available choices for this display setting. */
  choices?: Record<string, DisplaySettingChoice>;
}

/** Describes a setting for a display template. */
export interface DisplaySettingChoice {
  /**
   * The display name of this display setting.
   * @minLength 1
   * @maxLength 255
   */
  displayName: string;
  /**
   * The sort order of this choice within the setting.
   * @format int32
   */
  sortOrder?: number;
}

/** Describes a display template that can be assigned to content. */
export interface DisplayTemplate {
  /**
   * The key that identifies this display template.
   * @minLength 2
   * @maxLength 255
   * @pattern ^[A-Za-z][_0-9A-Za-z]+\z
   */
  key: string;
  /**
   * The display name of this display template.
   * @minLength 1
   * @maxLength 255
   */
  displayName: string;
  /**
   * The optional node type this display template is valid for.
   * @minLength 2
   * @maxLength 50
   * @pattern ^[A-Za-z][_0-9A-Za-z]+\z
   */
  nodeType?: string | null;
  /** Represent the base type of a ContentType. */
  baseType?: ContentBaseType;
  /**
   * The optional key of the content type this display template is valid for.
   * @minLength 2
   * @maxLength 255
   * @pattern ^[A-Za-z][_0-9A-Za-z]+\z
   */
  contentType?: string | null;
  /**
   * If this is the default display template for the associated base type,
   * node type or content type.
   */
  isDefault?: boolean;
  /**
   * A timestamp indicating when this display template was first created.
   * @format date-time
   */
  created?: string;
  /** The username of the user that created this display template. */
  createdBy?: string;
  /**
   * A timestamp indicating when this display template was last modified.
   * @format date-time
   */
  lastModified?: string;
  /** The username of the user that last modified this display template. */
  lastModifiedBy?: string;
  /** The available settings for this display template. */
  settings?: Record<string, DisplaySetting>;
}

export interface DisplayTemplatePage {
  /** The items in this paged collection. */
  items?: DisplayTemplate[];
  /**
   * The zero-based index of the current page.
   * @format int32
   */
  pageIndex?: number;
  /**
   * The number of item in each page. Not necessarily the same as the number of items in this page.
   * @format int32
   */
  pageSize?: number;
  /**
   * The estimated total number of items in the collection. May be omitted if the total item count is unknown.
   * @format int32
   */
  totalItemCount?: number;
}

/** A writable implementation of an EnumerationSettings`1. */
export interface DoubleEnumerationSettings {
  /** Enumeration values for this property or format. */
  values?: DoubleEnumerationValue[];
}

/** Describes an enumeration value. */
export interface DoubleEnumerationValue {
  /** The display name of the enumeration. */
  displayName?: string;
  /**
   * The value of the enumeration.
   * @format double
   */
  value?: number;
}

/** Describes a property list item that can contain a float number. */
export type FloatListItem = ListPropertyItem & {
  /** @format double */
  minimum?: number | null;
  /** @format double */
  maximum?: number | null;
  /** A writable implementation of an EnumerationSettings`1. */
  enum?: DoubleEnumerationSettings;
};

/** Describes a property that can contain a float number. */
export type FloatProperty = ContentTypeProperty & {
  /** @format double */
  minimum?: number | null;
  /** @format double */
  maximum?: number | null;
  /** A writable implementation of an EnumerationSettings`1. */
  enum?: DoubleEnumerationSettings;
};

/** Instruction for generating an alternative image from the main binary of an image content item. */
export interface ImageDescriptor {
  /**
   * The image width in pixels.
   * @format int32
   * @min 0
   * @max 2147483647
   */
  width?: number;
  /**
   * The image height in pixels.
   * @format int32
   * @min 0
   * @max 2147483647
   */
  height?: number;
  /** Indicates if the image should be pregenerated when a new image is uploaded rather than when first requested. */
  pregenerated?: boolean;
}

/** Describes a message from a package importing operation. */
export interface ImportPackageMessage {
  /** The section where the message originated from. */
  section?: string | null;
  /** The message describing an outcome. */
  message?: string;
  /** The identifier of the resource that was the reason for this message to be created. */
  identifier?: string | null;
}

/** Describes the result of a data package import. */
export interface ImportPackageResult {
  /** Indication if the import succeeded. */
  success?: boolean;
  /** List of messages describing the outcome from the package import. */
  outcomes?: ImportPackageMessage[];
  /** List of error messages from the package import. */
  errors?: ImportPackageMessage[];
  /** List of warning messages from the package import. */
  warnings?: ImportPackageMessage[];
}

/** Represent the indexing type of a ContentTypeProperty. */
export enum IndexingType {
  Disabled = "disabled",
  Queryable = "queryable",
  Searchable = "searchable",
}

/** A writable implementation of an EnumerationSettings`1. */
export interface Int32EnumerationSettings {
  /** Enumeration values for this property or format. */
  values?: Int32EnumerationValue[];
}

/** Describes an enumeration value. */
export interface Int32EnumerationValue {
  /** The display name of the enumeration. */
  displayName?: string;
  /**
   * The value of the enumeration.
   * @format int32
   */
  value?: number;
}

/** Describes a property list item that can contain integers. */
export type IntegerListItem = ListPropertyItem & {
  /** @format int32 */
  minimum?: number | null;
  /** @format int32 */
  maximum?: number | null;
  /** A writable implementation of an EnumerationSettings`1. */
  enum?: Int32EnumerationSettings;
};

/** Describes a property that can contain an integer. */
export type IntegerProperty = ContentTypeProperty & {
  /** @format int32 */
  minimum?: number | null;
  /** @format int32 */
  maximum?: number | null;
  /** A writable implementation of an EnumerationSettings`1. */
  enum?: Int32EnumerationSettings;
};

/** Describes a property that can contain a JSON value in the form of a string. */
export type JsonStringProperty = ContentTypeProperty & object;

/** A property in the CMS that may hold a list of items. */
export type ListProperty = ContentTypeProperty & {
  /**
   * Specifies the minimum number of items in this array property.
   * @format int32
   */
  minItems?: number | null;
  /**
   * Specifies the maximum number of items in this array property.
   * @format int32
   */
  maxItems?: number | null;
  /** Describes the list item of a ListProperty in the CMS. */
  items:
    | ComponentListItem
    | ContentListItem
    | ContentReferenceListItem
    | DateTimeListItem
    | FloatListItem
    | IntegerListItem
    | StringListItem
    | UrlListItem;
};

/** Describes the list item of a ListProperty in the CMS. */
export interface ListPropertyItem {
  /**
   * Represent the basic type that a PropertyFormat
   * is using for data storage and data transport.
   */
  type: PropertyDataType;
  /** The key of the PropertyFormat that this property item is an instance of. */
  format?: string | null;
}

/** Represent the different status values of a content locale. */
export enum LocaleStatus {
  Draft = "draft",
  Published = "published",
}

/** Manifest that describest CMS definitions. */
export interface Manifest {
  /** List of content type property groups. */
  propertyGroups?: PropertyGroup[];
  /** List of content types. */
  contentTypes?: ContentType[];
  /** List of display templates. */
  displayTemplates?: DisplayTemplate[];
  /**
   * A timestamp indicated when any item in this manifest was last modified.
   * @format date-time
   */
  lastModified?: string;
}

/**
 * Represents an OAuth JSON Web Token (JWT) and
 * its expiry in seconds.
 */
export interface OauthToken {
  /** Gets or sets the access token. */
  access_token?: string | null;
  /**
   * Gets or sets the expiry time in seconds.
   * @format int32
   */
  expires_in?: number;
  /** Gets or sets the token type. */
  token_type?: string;
}

/** Represents an OAuth error. */
export interface OauthTokenError {
  /** Gets or sets the error. */
  error?: string | null;
  /** Gets or sets the error description. */
  error_description?: string | null;
}

/** Represents an OAuth token request. */
export interface OauthTokenRequest {
  /** Gets or sets the grant type. */
  grant_type?: string | null;
  /** Gets or sets the client id. */
  client_id?: string | null;
  /** Gets or sets the client secret. */
  client_secret?: string | null;
  /** Get or sets the subject to act as. */
  act_as?: string | null;
}

/** Describes the status of a package job. */
export interface PackageJob {
  /** An unique key that can be used to track the staus of a package job. */
  key?: string;
  /** Represent the status of a package job. */
  status?: PackageJobStatus;
  /** List of messages describing the outcome from the package job. */
  outcomes?: PackageJobMessage[];
  /** List of error messages from the package job. */
  errors?: PackageJobMessage[];
  /** List of warning messages from the package job. */
  warnings?: PackageJobMessage[];
  /**
   * A timestamp indicates when this task was first created.
   * @format date-time
   */
  created?: string;
}

/** Describes a status message from a package job. */
export interface PackageJobMessage {
  /**
   * The section where the message originated from.
   * @example ""
   */
  section?: string;
  /**
   * The message describing an outcome.
   * @example ""
   */
  message?: string;
  /**
   * The identifier of the resource that was the reason for this message to be created.
   * @example ""
   */
  identifier?: string | null;
}

/** Represent the status of a package job. */
export type PackageJobStatus = object;

export interface ProblemDetails {
  type?: string | null;
  title?: string | null;
  /** @format int32 */
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  code?: string | null;
  errors?: Record<string, string[]>;
  [key: string]: any;
}

/**
 * Represent the basic type that a PropertyFormat
 * is using for data storage and data transport.
 */
export enum PropertyDataType {
  String = "string",
  Url = "url",
  Boolean = "boolean",
  Integer = "integer",
  Float = "float",
  DateTime = "dateTime",
  ContentReference = "contentReference",
  Content = "content",
  Binary = "binary",
  Json = "json",
  Array = "array",
  Component = "component",
}

/** Represent the definition of semantic property formats for content items. */
export interface PropertyFormat {
  /**
   * The key that identifies this PropertyFormat.
   * @maxLength 50
   */
  key?: string;
  /**
   * Represent the basic type that a PropertyFormat
   * is using for data storage and data transport.
   */
  dataType?: PropertyDataType;
  /**
   * Represent the basic type that a PropertyFormat
   * is using for data storage and data transport.
   */
  itemType?: PropertyDataType;
  /** The name and identifier of this PropertyFormat. */
  displayName?: string;
  /** Editor used for managing properties with this format. */
  editor?: string | null;
  deleted?: boolean;
  /** Settings for the editor. */
  editorSettings?: Record<string, object>;
  /** Enumerations for the format. */
  enum?: {
    values?: {
      value?: string | number;
      displayName?: string;
    }[];
  } | null;
}

export interface PropertyFormatPage {
  /** The items in this paged collection. */
  items?: PropertyFormat[];
  /**
   * The zero-based index of the current page.
   * @format int32
   */
  pageIndex?: number;
  /**
   * The number of item in each page. Not necessarily the same as the number of items in this page.
   * @format int32
   */
  pageSize?: number;
  /**
   * The estimated total number of items in the collection. May be omitted if the total item count is unknown.
   * @format int32
   */
  totalItemCount?: number;
}

/** Describes a property group of a ContentType in the CMS. */
export interface PropertyGroup {
  /**
   * The key that identifies this PropertyGroup.
   * @minLength 2
   * @maxLength 255
   * @pattern ^[A-Za-z][_0-9A-Za-z]+\z
   */
  key: string;
  /**
   * The display name of this PropertyGroup.
   * @maxLength 255
   */
  displayName?: string;
  /** A string that is used to indicate the source of this PropertyGroup. */
  source?: string;
  /**
   * An value that is used to when sorting PropertyGroup instances.
   * @format int32
   */
  sortOrder?: number;
}

export interface PropertyGroupPage {
  /** The items in this paged collection. */
  items?: PropertyGroup[];
  /**
   * The zero-based index of the current page.
   * @format int32
   */
  pageIndex?: number;
  /**
   * The number of item in each page. Not necessarily the same as the number of items in this page.
   * @format int32
   */
  pageSize?: number;
  /**
   * The estimated total number of items in the collection. May be omitted if the total item count is unknown.
   * @format int32
   */
  totalItemCount?: number;
}

/** A writable implementation of an EnumerationSettings`1. */
export interface StringEnumerationSettings {
  /** Enumeration values for this property or format. */
  values?: StringEnumerationValue[];
}

/** Describes an enumeration value. */
export interface StringEnumerationValue {
  /** The display name of the enumeration. */
  displayName?: string;
  /** The value of the enumeration. */
  value?: string;
}

/** Describes a property list item that can contain a string. */
export type StringListItem = ListPropertyItem & {
  /** @format int32 */
  minLength?: number | null;
  /** @format int32 */
  maxLength?: number | null;
  pattern?: string | null;
  /** A writable implementation of an EnumerationSettings`1. */
  enum?: StringEnumerationSettings;
};

/** Describes a property that can contain strings. */
export type StringProperty = ContentTypeProperty & {
  /** @format int32 */
  minLength?: number | null;
  /** @format int32 */
  maxLength?: number | null;
  pattern?: string | null;
  /** A writable implementation of an EnumerationSettings`1. */
  enum?: StringEnumerationSettings;
};

/** Describes a property list item that can contain a URL. */
export type UrlListItem = ListPropertyItem & object;

/** Describes a property that can contain URLs. */
export type UrlProperty = ContentTypeProperty & object;

/** Represent the different status values of a content version. */
export enum VersionStatus {
  Draft = "draft",
  Ready = "ready",
  Published = "published",
  Previous = "previous",
  Scheduled = "scheduled",
  Rejected = "rejected",
  InReview = "inReview",
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "/_cms/preview2";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Optimizely CMS Content API
 * @version preview2
 * @baseUrl /_cms/preview2
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  changesets = {
    /**
     * @description Lists all changeset using the provided options.
     *
     * @tags Changesets
     * @name ChangesetsList
     * @summary List changeset
     * @request GET:/changesets
     * @secure
     */
    changesetsList: (
      query?: {
        /**
         * @format int32
         * @min 0
         * @max 10000
         */
        pageIndex?: number;
        /**
         * @format int32
         * @min 1
         * @max 10000
         */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ChangesetPage, ProblemDetails>({
        path: `/changesets`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates a new changeset.
     *
     * @tags Changesets
     * @name ChangesetsCreate
     * @summary Create changeset
     * @request POST:/changesets
     * @secure
     */
    changesetsCreate: (data: Changeset, params: RequestParams = {}) =>
      this.request<Changeset, ProblemDetails>({
        path: `/changesets`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets the changeset with the provided key.
     *
     * @tags Changesets
     * @name ChangesetsGet
     * @summary Get changeset
     * @request GET:/changesets/{key}
     * @secure
     */
    changesetsGet: (key: string, params: RequestParams = {}) =>
      this.request<Changeset, ProblemDetails>({
        path: `/changesets/${key}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes the changeset with the provided key. If a changeset with the provided key does not exist an error is returned.
     *
     * @tags Changesets
     * @name ChangesetsDelete
     * @summary Delete changeset
     * @request DELETE:/changesets/{key}
     * @secure
     */
    changesetsDelete: (key: string, params: RequestParams = {}) =>
      this.request<Changeset, ProblemDetails>({
        path: `/changesets/${key}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates or replaces a changeset. If a changeset with the provided key exist it is replaced. Otherwise a new changeset is created.
     *
     * @tags Changesets
     * @name ChangesetsPut
     * @summary Create or replace changeset
     * @request PUT:/changesets/{key}
     * @secure
     */
    changesetsPut: (key: string, data: Changeset, params: RequestParams = {}) =>
      this.request<Changeset, ProblemDetails>({
        path: `/changesets/${key}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets the changeset item for the specified content reference.
     *
     * @tags Changesets
     * @name ChangesetsGetItem
     * @summary Get changeset item
     * @request GET:/changesets/{changeset}/items/{key}/versions/{version}
     * @secure
     */
    changesetsGetItem: (changeset: string, key: string, version: string, params: RequestParams = {}) =>
      this.request<ChangesetItem, ProblemDetails>({
        path: `/changesets/${changeset}/items/${key}/versions/${version}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes the specified changeset item from the changeset.
     *
     * @tags Changesets
     * @name ChangesetsDeleteItem
     * @summary Delete changeset item
     * @request DELETE:/changesets/{changeset}/items/{key}/versions/{version}
     * @secure
     */
    changesetsDeleteItem: (changeset: string, key: string, version: string, params: RequestParams = {}) =>
      this.request<ChangesetItem, ProblemDetails>({
        path: `/changesets/${changeset}/items/${key}/versions/${version}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists the available changeset items for the specified changeset using the provided options.
     *
     * @tags Changesets
     * @name ChangesetsListItems
     * @summary List changeset items
     * @request GET:/changesets/{changeset}/items
     * @secure
     */
    changesetsListItems: (
      changeset: string,
      query?: {
        /**
         * @format int32
         * @min 0
         * @max 10000
         */
        pageIndex?: number;
        /**
         * @format int32
         * @min 1
         * @max 10000
         */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ChangesetItemPage, ProblemDetails>({
        path: `/changesets/${changeset}/items`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates the given changeset item.
     *
     * @tags Changesets
     * @name ChangesetsCreateItem
     * @summary Create changeset item
     * @request POST:/changesets/{changeset}/items
     * @secure
     */
    changesetsCreateItem: (changeset: string, data: ChangesetItem, params: RequestParams = {}) =>
      this.request<ChangesetItem, ProblemDetails>({
        path: `/changesets/${changeset}/items`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Updates the given changeset item.
     *
     * @tags Changesets
     * @name ChangesetsUpdateItem
     * @summary Update changeset item
     * @request PUT:/changesets/{changeset}/items/{contentKey}/versions/{contentVersion}
     * @secure
     */
    changesetsUpdateItem: (
      changeset: string,
      contentKey: string,
      contentVersion: string,
      data: ChangesetItem,
      query?: {
        /** Indicates if a new changeset item should be created if it does not exist */
        allowCreate?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<ChangesetItem, ProblemDetails>({
        path: `/changesets/${changeset}/items/${contentKey}/versions/${contentVersion}`,
        method: "PUT",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  content = {
    /**
     * @description Create a new content item.
     *
     * @tags Content
     * @name ContentCreate
     * @summary Create content
     * @request POST:/content
     * @secure
     */
    contentCreate: (
      data: ContentItem,
      query?: {
        /** Indicates that the content validation should be ignored. */
        skipValidation?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<ContentItemWithContentTypes, ProblemDetails>({
        path: `/content`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get shared metadata about the content instance with the provided key.
     *
     * @tags Content
     * @name ContentGetMetadata
     * @summary Get content
     * @request GET:/content/{key}
     * @secure
     */
    contentGetMetadata: (
      key: string,
      query?: {
        /** Indicates that metadata for a deleted content may be returned. */
        allowDeleted?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<ContentMetadata, ProblemDetails>({
        path: `/content/${key}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update an existing content item. If a content item with the provided key does not exist an error is returned.
     *
     * @tags Content
     * @name ContentPatchMetadata
     * @summary Update content
     * @request PATCH:/content/{key}
     * @secure
     */
    contentPatchMetadata: (key: string, data: ContentMetadata, params: RequestParams = {}) =>
      this.request<ContentMetadata, ProblemDetails>({
        path: `/content/${key}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes the content item with the provided key. If a content item with the provided key does not exist an error is returned.
     *
     * @tags Content
     * @name ContentDelete
     * @summary Delete content
     * @request DELETE:/content/{key}
     * @secure
     */
    contentDelete: (
      key: string,
      query?: {
        /** Indicates that the content item should be permanently deleted immediately or if it should be soft deleted first. */
        permanent?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<ContentMetadata, ProblemDetails>({
        path: `/content/${key}`,
        method: "DELETE",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get the content path with the provided key.
     *
     * @tags Content
     * @name ContentGetPath
     * @summary Get content path
     * @request GET:/content/{key}/path
     * @secure
     */
    contentGetPath: (
      key: string,
      query?: {
        /**
         * @format int32
         * @min 0
         * @max 10000
         */
        pageIndex?: number;
        /**
         * @format int32
         * @min 1
         * @max 10000
         */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ContentMetadataPage, ProblemDetails>({
        path: `/content/${key}/path`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List the content items located in a specific container.
     *
     * @tags Content
     * @name ContentListItems
     * @summary List content in container
     * @request GET:/content/{key}/items
     * @secure
     */
    contentListItems: (
      key: string,
      query?: {
        /** Indicates which content types or base types to include in the list. */
        contentTypes?: string[];
        /**
         * @format int32
         * @min 0
         * @max 10000
         */
        pageIndex?: number;
        /**
         * @format int32
         * @min 1
         * @max 10000
         */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ContentMetadataPage, ProblemDetails>({
        path: `/content/${key}/items`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List the assets that belongs to a content instance.
     *
     * @tags Content
     * @name ContentListAssets
     * @summary List assets
     * @request GET:/content/{key}/assets
     * @secure
     */
    contentListAssets: (
      key: string,
      query?: {
        /** Indicates which content types or base types to include in the list. */
        contentTypes?: string[];
        /**
         * @format int32
         * @min 0
         * @max 10000
         */
        pageIndex?: number;
        /**
         * @format int32
         * @min 1
         * @max 10000
         */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ContentMetadataPage, ProblemDetails>({
        path: `/content/${key}/assets`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a copy of the content item with the provided key.
     *
     * @tags Content
     * @name ContentCopy
     * @summary Copy content
     * @request POST:/content/{key}:copy
     * @secure
     */
    contentCopy: (key: string, copy: string, data: CopyContentOptions, params: RequestParams = {}) =>
      this.request<ContentMetadata, ProblemDetails>({
        path: `/content/${key}${copy}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Restore the deleted content item with the provided key. If a content item with the provided key is not deleted an error is returned.
     *
     * @tags Content
     * @name ContentUndelete
     * @summary Restore content
     * @request POST:/content/{key}:undelete
     * @secure
     */
    contentUndelete: (key: string, undelete: string, params: RequestParams = {}) =>
      this.request<ContentMetadata, ProblemDetails>({
        path: `/content/${key}${undelete}`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List content versions based on the provided query options.
     *
     * @tags Content
     * @name ContentListAllVersions
     * @summary Query versions
     * @request GET:/content/versions
     * @secure
     */
    contentListAllVersions: (
      query?: {
        /**
         * Indicates which content locales that should be listed. Use 'NEUTRAL' to include locale-neutral content.
         * Locale must be a valid IETF BCP-47 language tag.
         */
        locales?: string[];
        /** Indicates which status content versions must have to be listed. */
        statuses?: VersionStatus[];
        /**
         * @format int32
         * @min 0
         * @max 10000
         */
        pageIndex?: number;
        /**
         * @format int32
         * @min 1
         * @max 10000
         */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ContentItemListWithContentTypes, ProblemDetails>({
        path: `/content/versions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List versions of the content item with the provided key and the provided options.
     *
     * @tags Content
     * @name ContentListVersions
     * @summary List versions
     * @request GET:/content/{key}/versions
     * @secure
     */
    contentListVersions: (
      key: string,
      query?: {
        /**
         * Indicates which content locales that should be listed. Use 'NEUTRAL' to include locale-neutral content.
         * Locale must be a valid IETF BCP-47 language tag.
         */
        locales?: string[];
        /** Indicates which status content versions must have to be listed. */
        statuses?: VersionStatus[];
        /**
         * @format int32
         * @min 0
         * @max 10000
         */
        pageIndex?: number;
        /**
         * @format int32
         * @min 1
         * @max 10000
         */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ContentItemListWithContentTypes, ProblemDetails>({
        path: `/content/${key}/versions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new version of a content item.
     *
     * @tags Content
     * @name ContentCreateVersion
     * @summary Create version
     * @request POST:/content/{key}/versions
     * @secure
     */
    contentCreateVersion: (
      key: string,
      data: ContentItem,
      query?: {
        /** Indicates that the content validation should be ignored. */
        skipValidation?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<ContentItemWithContentTypes, ProblemDetails>({
        path: `/content/${key}/versions`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes the content item with the provided key. If a content item with the provided key does not exist an error is returned.
     *
     * @tags Content
     * @name ContentDeleteLocale
     * @summary Delete locale
     * @request DELETE:/content/{key}/versions
     * @secure
     */
    contentDeleteLocale: (
      key: string,
      query?: {
        locale?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ContentItemWithContentTypes, ProblemDetails>({
        path: `/content/${key}/versions`,
        method: "DELETE",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get the content item with the provided key and version.
     *
     * @tags Content
     * @name ContentGetVersion
     * @summary Get version
     * @request GET:/content/{key}/versions/{version}
     * @secure
     */
    contentGetVersion: (
      key: string,
      version: string,
      query?: {
        locale?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ContentItemWithContentTypes, ProblemDetails>({
        path: `/content/${key}/versions/${version}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update an existing content item. If a content item with the provided key does not exist an error is returned.
     *
     * @tags Content
     * @name ContentPatchVersion
     * @summary Update version
     * @request PATCH:/content/{key}/versions/{version}
     * @secure
     */
    contentPatchVersion: (
      key: string,
      version: string,
      data: ContentItem,
      query?: {
        /** The locale of the content that should be updated. */
        locale?: string;
        /** Indicates that the content validation should be ignored. */
        skipValidation?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<ContentItemWithContentTypes, ProblemDetails>({
        path: `/content/${key}/versions/${version}`,
        method: "PATCH",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes the content item with the provided key. If a content item with the provided key does not exist an error is returned.
     *
     * @tags Content
     * @name ContentDeleteVersion
     * @summary Delete version
     * @request DELETE:/content/{key}/versions/{version}
     * @secure
     */
    contentDeleteVersion: (key: string, version: string, params: RequestParams = {}) =>
      this.request<ContentItemWithContentTypes, ProblemDetails>({
        path: `/content/${key}/versions/${version}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  contenttypes = {
    /**
     * @description List content types using the provided options.
     *
     * @tags ContentTypes
     * @name ContentTypesList
     * @summary List content types
     * @request GET:/contenttypes
     * @secure
     */
    contentTypesList: (
      query?: {
        /**
         * Only include types that are available for creation under the provided container type
         * @example ""
         */
        forContainerType?: string;
        /**
         * Indicates which sources should be included when listing content types.
         * Use All to include content types from all sources or
         * Default to include content types without a specific sources.
         */
        sources?: string[];
        /**
         * @format int32
         * @min 0
         * @max 10000
         */
        pageIndex?: number;
        /**
         * @format int32
         * @min 1
         * @max 10000
         */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ContentTypePage, ProblemDetails>({
        path: `/contenttypes`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new content type.
     *
     * @tags ContentTypes
     * @name ContentTypesCreate
     * @summary Create content type
     * @request POST:/contenttypes
     * @secure
     */
    contentTypesCreate: (data: ContentType, params: RequestParams = {}) =>
      this.request<ContentType, ProblemDetails>({
        path: `/contenttypes`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get the content type with the provided key.
     *
     * @tags ContentTypes
     * @name ContentTypesGet
     * @summary Get content type
     * @request GET:/contenttypes/{key}
     * @secure
     */
    contentTypesGet: (key: string, params: RequestParams = {}) =>
      this.request<ContentType, ProblemDetails>({
        path: `/contenttypes/${key}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create or replace a content type. If a content type with the provided key exist it is replaced. Otherwise a new content type is created.
     *
     * @tags ContentTypes
     * @name ContentTypesPut
     * @summary Create or replace content type
     * @request PUT:/contenttypes/{key}
     * @secure
     */
    contentTypesPut: (
      key: string,
      data: ContentType,
      query?: {
        /** Update the content type even though the changes might result in data loss. */
        ignoreDataLossWarnings?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<ContentType, ProblemDetails>({
        path: `/contenttypes/${key}`,
        method: "PUT",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Update an existing content type. If a content type with the provided key does not exist an error is returned.
     *
     * @tags ContentTypes
     * @name ContentTypesPatch
     * @summary Update content type
     * @request PATCH:/contenttypes/{key}
     * @secure
     */
    contentTypesPatch: (
      key: string,
      data: ContentType,
      query?: {
        /** Update the content type even though the changes might result in data loss. */
        ignoreDataLossWarnings?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<ContentType, ProblemDetails>({
        path: `/contenttypes/${key}`,
        method: "PATCH",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes the content type with the provided key. If a content type with the provided key does not exist an error is returned.
     *
     * @tags ContentTypes
     * @name ContentTypesDelete
     * @summary Delete content type
     * @request DELETE:/contenttypes/{key}
     * @secure
     */
    contentTypesDelete: (key: string, params: RequestParams = {}) =>
      this.request<ContentType, ProblemDetails>({
        path: `/contenttypes/${key}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  displaytemplates = {
    /**
     * @description List display templates using the provided options.
     *
     * @tags DisplayTemplates
     * @name DisplayTemplatesList
     * @summary List display templates
     * @request GET:/displaytemplates
     * @secure
     */
    displayTemplatesList: (
      query?: {
        /**
         * @format int32
         * @min 0
         * @max 10000
         */
        pageIndex?: number;
        /**
         * @format int32
         * @min 1
         * @max 10000
         */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<DisplayTemplatePage, ProblemDetails>({
        path: `/displaytemplates`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new display template.
     *
     * @tags DisplayTemplates
     * @name DisplayTemplatesCreate
     * @summary Create display template
     * @request POST:/displaytemplates
     * @secure
     */
    displayTemplatesCreate: (data: DisplayTemplate, params: RequestParams = {}) =>
      this.request<DisplayTemplate, ProblemDetails>({
        path: `/displaytemplates`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get the display template with the provided key.
     *
     * @tags DisplayTemplates
     * @name DisplayTemplatesGet
     * @summary Get display template
     * @request GET:/displaytemplates/{key}
     * @secure
     */
    displayTemplatesGet: (key: string, params: RequestParams = {}) =>
      this.request<DisplayTemplate, ProblemDetails>({
        path: `/displaytemplates/${key}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create or replace a display template. If a display template with the provided key exist it is replaced. Otherwise a new display template is created.
     *
     * @tags DisplayTemplates
     * @name DisplayTemplatesPut
     * @summary Create or replace a display template
     * @request PUT:/displaytemplates/{key}
     * @secure
     */
    displayTemplatesPut: (key: string, data: DisplayTemplate, params: RequestParams = {}) =>
      this.request<DisplayTemplate, ProblemDetails>({
        path: `/displaytemplates/${key}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Update an existing display template.
     *
     * @tags DisplayTemplates
     * @name DisplayTemplatesPatch
     * @summary Update display template
     * @request PATCH:/displaytemplates/{key}
     * @secure
     */
    displayTemplatesPatch: (key: string, data: DisplayTemplate, params: RequestParams = {}) =>
      this.request<DisplayTemplate, ProblemDetails>({
        path: `/displaytemplates/${key}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes the display template with the provided key.
     *
     * @tags DisplayTemplates
     * @name DisplayTemplatesDelete
     * @summary Delete display template
     * @request DELETE:/displaytemplates/{key}
     * @secure
     */
    displayTemplatesDelete: (key: string, params: RequestParams = {}) =>
      this.request<DisplayTemplate, ProblemDetails>({
        path: `/displaytemplates/${key}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  oauth = {
    /**
     * @description Request an access token. This endpoint only supports the 'client_credentials' grant type and will only issue short-lived tokens.
     *
     * @tags Oauth
     * @name OauthToken
     * @summary Request access token
     * @request POST:/oauth/token
     * @secure
     */
    oauthToken: (data: OauthTokenRequest, params: RequestParams = {}) =>
      this.request<OauthToken, OauthTokenError>({
        path: `/oauth/token`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  packages = {
    /**
     * @description Get a package job status.
     *
     * @tags Packages
     * @name PackagesGet
     * @summary Get job status
     * @request GET:/packages/{key}
     * @secure
     */
    packagesGet: (key: string, params: RequestParams = {}) =>
      this.request<PackageJob, ProblemDetails>({
        path: `/packages/${key}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Export a data package.
     *
     * @tags Packages
     * @name PackagesExport
     * @summary Export package
     * @request GET:/packages
     * @secure
     */
    packagesExport: (
      query?: {
        /** Indicates if read-only resources should be included in the export data. */
        includeReadOnly?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<Manifest, ProblemDetails>({
        path: `/packages`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Import a data package.
     *
     * @tags Packages
     * @name PackagesImport
     * @summary Import package
     * @request POST:/packages
     * @secure
     */
    packagesImport: (
      data: File,
      query?: {
        /** The key of the container content where new content items should be created under. */
        container?: string;
        /**
         * Indicates if the existing content item in CMS could be overwritten when the importing package contains
         * content item with the same key.
         * If set to `false`, always create new content item under the specified container regardless of the content key.
         * @default false
         */
        overwriteExistingContentItems?: boolean;
        /**
         * Updates the content type even though the changes might result in data loss.
         * @default false
         */
        ignoreDataLossWarnings?: boolean;
        /**
         * Specifies the locale in which content item in that locale will be imported. If no locale is defined
         * then content in all locales are imported.
         */
        locale?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ImportPackageResult, ProblemDetails>({
        path: `/packages`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  propertyformats = {
    /**
     * @description List all property formats using the provided options.
     *
     * @tags PropertyFormats
     * @name PropertyFormatsList
     * @summary List property formats
     * @request GET:/propertyformats
     * @secure
     */
    propertyFormatsList: (
      query?: {
        /**
         * @format int32
         * @min 0
         * @max 10000
         */
        pageIndex?: number;
        /**
         * @format int32
         * @min 1
         * @max 10000
         */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PropertyFormatPage, ProblemDetails>({
        path: `/propertyformats`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get the property format with the provided key.
     *
     * @tags PropertyFormats
     * @name PropertyFormatsGet
     * @summary Get property format
     * @request GET:/propertyformats/{key}
     * @secure
     */
    propertyFormatsGet: (
      key: string,
      query?: {
        /** Indicates that a deleted property format may be returned. */
        allowDeleted?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<PropertyFormat, ProblemDetails>({
        path: `/propertyformats/${key}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  propertygroups = {
    /**
     * @description List property groups using the provided options.
     *
     * @tags PropertyGroups
     * @name PropertyGroupsList
     * @summary List property groups
     * @request GET:/propertygroups
     * @secure
     */
    propertyGroupsList: (
      query?: {
        /**
         * Indicates which property groups sources that should be listed.
         * Use All to include groups from all sources or
         * Default to include groups without a specific sources.
         */
        sources?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<PropertyGroupPage, ProblemDetails>({
        path: `/propertygroups`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new property group.
     *
     * @tags PropertyGroups
     * @name PropertyGroupsCreate
     * @summary Create property group
     * @request POST:/propertygroups
     * @secure
     */
    propertyGroupsCreate: (data: PropertyGroup, params: RequestParams = {}) =>
      this.request<PropertyGroup, ProblemDetails>({
        path: `/propertygroups`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get the property group with the provided key.
     *
     * @tags PropertyGroups
     * @name PropertyGroupsGet
     * @summary Get property group
     * @request GET:/propertygroups/{key}
     * @secure
     */
    propertyGroupsGet: (key: string, params: RequestParams = {}) =>
      this.request<PropertyGroup, ProblemDetails>({
        path: `/propertygroups/${key}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create or replace a property group. If a property group with the provided key exist it is replaced. Otherwise a new property group is created.
     *
     * @tags PropertyGroups
     * @name PropertyGroupsPut
     * @summary Create or replace property group
     * @request PUT:/propertygroups/{key}
     * @secure
     */
    propertyGroupsPut: (key: string, data: PropertyGroup, params: RequestParams = {}) =>
      this.request<PropertyGroup, ProblemDetails>({
        path: `/propertygroups/${key}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Update an existing property group.
     *
     * @tags PropertyGroups
     * @name PropertyGroupsPatch
     * @summary Update property group
     * @request PATCH:/propertygroups/{key}
     * @secure
     */
    propertyGroupsPatch: (key: string, data: PropertyGroup, params: RequestParams = {}) =>
      this.request<PropertyGroup, ProblemDetails>({
        path: `/propertygroups/${key}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes the property group with the provided key.
     *
     * @tags PropertyGroups
     * @name PropertyGroupsDelete
     * @summary Delete property group
     * @request DELETE:/propertygroups/{key}
     * @secure
     */
    propertyGroupsDelete: (key: string, params: RequestParams = {}) =>
      this.request<PropertyGroup, ProblemDetails>({
        path: `/propertygroups/${key}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}

