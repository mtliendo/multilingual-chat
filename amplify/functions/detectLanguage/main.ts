// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/comprehend/command/DetectDominantLanguageCommand/

import type { Handler } from "aws-lambda"
import {
  ComprehendClient,
  DetectDominantLanguageCommand,
} from "@aws-sdk/client-comprehend"

const comprehendClient = new ComprehendClient()

export const handler: Handler = async (event, context) => {
  console.log("incoming event", event)
  console.log("incoming context", context)
  const text = JSON.parse(event.body).messageText
  const command = new DetectDominantLanguageCommand({
    Text: text,
  })

  const result = await comprehendClient.send(command)
  console.log(result)
  const topLanguage = result.Languages?.[0]?.LanguageCode
  return topLanguage
}
