import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'
import getContent from '../services/content'
import { ChatContent } from '../services/content/types'



export const metadata = {
  title: 'AI Chatbot'
}

export default async function IndexPage() {
  const id = nanoid()
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()

  const { fields } = await getContent<{fields: ChatContent }>('chatContext', 'travel-ai-chatbot')

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat id={id} session={session} missingKeys={missingKeys} chatConfig={fields} />
    </AI>
  )
}
