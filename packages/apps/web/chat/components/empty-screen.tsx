import { ChatContent } from '@/app/services/content/types'
import { ExternalLink } from '@/components/external-link'
import { FC } from 'react'
import renderRichText from './contentful/renderRichText';

export const EmptyScreen: FC<{chatConfig: ChatContent}> = ({chatConfig}) =>  {
  const intro = renderRichText({ richTextDocument: chatConfig.intro });
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
      
       <h1 className="text-lg font-semibold">
          {chatConfig.title}
        </h1>
        {intro}
      </div>
    </div>
  )
}
