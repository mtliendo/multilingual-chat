// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/comprehend/command/DetectDominantLanguageCommand/

import type { Handler } from "aws-lambda"
import { Amplify } from "aws-amplify"
import { events } from "aws-amplify/data"

Amplify.configure({
  API: {
    Events: {
      endpoint:
        "https://o6hdsxrz4ve5tjdek5sbuk6mwu.appsync-api.us-east-2.amazonaws.com/event",
      region: "us-east-2",
      defaultAuthMode: "apiKey",
      apiKey: "da2-p4ffimryzjhcthplhsab43f2ba",
    },
  },
})

export const handler: Handler = async (event, context) => {
  const eventBody = JSON.parse(event.body)

  // Publish via HTTP POST
  await events.post("seattle-meetup/multi-lingual-chat", eventBody)

  return {
    message: "Event published",
  }
}
