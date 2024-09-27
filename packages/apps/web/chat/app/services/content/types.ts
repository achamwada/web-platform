import { Document } from '@contentful/rich-text-types'

export interface ChatContent {
  title: string
  contentEntryKey: string
  intro: Document
  settings: {
    system: string
  }
  buttons: ChatButton[]
}

export interface ContentBlock {
  data: Record<string, unknown>
  content: TextContent[]
  nodeType: string
}

export interface TextContent {
  data: Record<string, unknown>
  marks: unknown[]
  value: string
  nodeType: string
}

export interface ChatButton {
  metadata: {
    tags: unknown[]
  }
  sys: {
    space: SysLink
    id: string
    type: string
    createdAt: string
    updatedAt: string
    environment: SysLink
    revision: number
    contentType: SysLink
    locale: string
  }
  fields: {
    title: string
    chatMessage: string
  }
}

export interface SysLink {
  sys: {
    type: string
    linkType: string
    id: string
  }
}
