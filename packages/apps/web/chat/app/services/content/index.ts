import { API_GATEWAY_URL } from '@/lib/constants'
import axios, { AxiosResponse } from 'axios'

interface TalkbotResponse {
  [key: string]: any
}

const getContent = async <T = TalkbotResponse>(
  contentTypeId: string,
  contentEntryKey?: string
  // @ts-ignore
): Promise<T> => {
  const url = API_GATEWAY_URL

  const params: { contentTypeId: string; contentEntryKey?: string } = {
    contentTypeId
  }
  if (contentEntryKey) {
    params.contentEntryKey = contentEntryKey
  }

  try {
    const response: AxiosResponse<T> = await axios.get(url, {
      params
    })

    return response.data
  } catch (error) {
    console.error('Error fetching Talkbot data:', error)
  }
}

export default getContent
