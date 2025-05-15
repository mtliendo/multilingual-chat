import { defineBackend } from "@aws-amplify/backend"
import { auth } from "./auth/resource"
import { data } from "./data/resource"
import { detectLanguage } from "./functions/detectLanguage/resource"
import { multiLanguageTranslate } from "./functions/multiLanguageTranslate/resource"
import { FunctionUrlAuthType } from "aws-cdk-lib/aws-lambda"
import { PolicyStatement } from "aws-cdk-lib/aws-iam"
import { publishEvent } from "./functions/publishEvent/resource"
import { AppSyncAuthorizationType } from "aws-cdk-lib/aws-appsync"
const backend = defineBackend({
  auth,
  data,
  detectLanguage,
  multiLanguageTranslate,
  publishEvent,
})

const detectLanguageFunction = backend.detectLanguage.resources.lambda

const detectLanguageFunctionUrl = detectLanguageFunction.addFunctionUrl({
  authType: FunctionUrlAuthType.NONE,
})

const multiLanguageTranslateFunction =
  backend.multiLanguageTranslate.resources.lambda

const multiLanguageTranslateFunctionUrl =
  multiLanguageTranslateFunction.addFunctionUrl({
    authType: FunctionUrlAuthType.NONE,
  })

const publishEventFunction = backend.publishEvent.resources.lambda

const publishEventFunctionUrl = publishEventFunction.addFunctionUrl({
  authType: FunctionUrlAuthType.NONE,
})

detectLanguageFunction.addToRolePolicy(
  new PolicyStatement({
    actions: ["comprehend:DetectDominantLanguage"],
    resources: ["*"],
  })
)

multiLanguageTranslateFunction.addToRolePolicy(
  new PolicyStatement({
    resources: [
      "arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-5-sonnet-20240620-v1:0",
      "arn:aws:bedrock:us-east-2::foundation-model/anthropic.claude-3-5-sonnet-20240620-v1:0",
      "arn:aws:bedrock:us-west-2::foundation-model/anthropic.claude-3-5-sonnet-20240620-v1:0",
      `arn:aws:bedrock:us-east-2:${backend.stack.account}:inference-profile/us.anthropic.claude-3-5-sonnet-20240620-v1:0`,
    ],
    actions: ["bedrock:InvokeModel"],
  })
)

backend.data.addHttpDataSource(
  "orkesConductorHTTPDataSource",
  "https://developer.orkescloud.com"
)

backend.publishEvent.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    actions: ["appsync:EventPublish"],
    resources: ["*"],
  })
)

backend.addOutput({
  custom: {
    detectLanguageFunctionUrl: detectLanguageFunctionUrl.url,
    multiLanguageTranslateFunctionUrl: multiLanguageTranslateFunctionUrl.url,
    publishEventFunctionUrl: publishEventFunctionUrl.url,
    events: {
      url: `https://o6hdsxrz4ve5tjdek5sbuk6mwu.appsync-api.us-east-2.amazonaws.com/event`,
      aws_region: backend.stack.region,
      default_authorization_type: AppSyncAuthorizationType.API_KEY,
      api_key: "da2-p4ffimryzjhcthplhsab43f2ba",
    },
  },
})
