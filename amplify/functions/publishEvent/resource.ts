import { defineFunction } from "@aws-amplify/backend"

export const publishEvent = defineFunction({
  name: "publish-event",
  entry: "./main.ts",
  runtime: 22,
})
