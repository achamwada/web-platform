const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY // Store this in AWS Lambda environment variables
})

const openai = new OpenAIApi(configuration)

const handler = async event => {
  try {
    const body = JSON.parse(event.body) // Parse incoming request body
    const messages = body.messages

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages
    })

    const chatMessage = response.data.choices[0].message

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: chatMessage
      })
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to process the request.',
        details: error.message
      })
    }
  }
}

export default handler
