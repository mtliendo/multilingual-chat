import { type ClientSchema, a, defineData } from "@aws-amplify/backend"

const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.guest()]),
  invokeOrkesConductor: a
    .mutation()
    .arguments({ messageText: a.string(), username: a.string() })
    .authorization((allow) => [allow.publicApiKey()])
    .handler([
      a.handler.custom({
        entry: "./invokeOrkesCondutor/createJWT.js",
        dataSource: "orkesConductorHTTPDataSource",
      }),
      a.handler.custom({
        entry: "./invokeOrkesCondutor/invokeWorkflow.js",
        dataSource: "orkesConductorHTTPDataSource",
      }),
    ])
    .returns(a.customType({ workflowId: a.string() })),
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "identityPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
      description: "API Key Authorization for Orkes Conductor",
    },
  },
  logging: {
    fieldLogLevel: "all",
  },
})
