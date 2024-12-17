import {
  Options,
  documentToReactComponents
} from '@contentful/rich-text-react-renderer'
import { Document } from '@contentful/rich-text-types'

const renderRichText = ({
  richTextDocument,
  options
}: {
  richTextDocument: Document
  options?: Options
}) => documentToReactComponents(richTextDocument, options)
export default renderRichText
