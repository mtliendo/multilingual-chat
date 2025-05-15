// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/comprehend/command/DetectDominantLanguageCommand/

import type { Handler } from "aws-lambda"
import {
  BedrockRuntimeClient,
  ContentBlock,
  ConversationRole,
  ConverseCommand,
} from "@aws-sdk/client-bedrock-runtime"
const client = new BedrockRuntimeClient()

export const handler: Handler = async (event, context) => {
  // {
  //   "supportedLanguages": "${workflow.variables.supportedLanguages}",
  //   "detectedLanguage": "${detectLanguage.output.response.body}",
  //   "originalMessage": "${workflow.input.messageText}"
  // }
  console.log("event", event)
  type Params = {
    supportedLanguages: string
    detectedLanguage: string
    originalMessage: string
  }
  const params: Params = JSON.parse(event.body)

  const systemTraits = `You're a helpful assistant that can translate text into multiple languages. You will be given a message and a list of supported languages. You will then translate the message into the supported languages.

  The supported languages are: ${params.supportedLanguages}
  The message to translate is: ${params.originalMessage}`

  try {
    const command = new ConverseCommand({
      modelId: "us.anthropic.claude-3-5-sonnet-20240620-v1:0",
      system: [{ text: systemTraits }],
      messages: [
        {
          role: "user" as ConversationRole,
          content: [
            {
              text: params.originalMessage,
            } as ContentBlock.TextMember,
          ],
        },
      ],
      toolConfig: {
        toolChoice: { tool: { name: "generateMessageTranslations" } },
        tools: [
          {
            toolSpec: {
              inputSchema: {
                json: {
                  type: "object",
                  properties: {
                    translation: {
                      type: "object",
                      properties: {
                        english: {
                          type: "string",
                        },
                        spanish: {
                          type: "string",
                        },
                        french: {
                          type: "string",
                        },
                      },
                    },
                  },
                  required: ["translation"],
                },
              },
              name: "generateMessageTranslations",
            },
          },
        ],
      },
    })
    console.log("about to send the response")

    try {
      console.log("about to send the response in the try")
      const response = await client.send(command)
      console.log("response from bedrock", response)

      if (response.output?.message?.content?.[0]) {
        console.log(
          "about to return the response content translation",
          response.output.message.content[0].toolUse?.input
        )
        return response.output.message.content[0].toolUse?.input
      }
    } catch (error) {
      console.error("Error in the command:", error)
    }
  } catch (error) {
    console.error("Error:", error)
  }
  return null
}
