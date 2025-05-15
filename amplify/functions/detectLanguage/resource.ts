import { defineFunction } from "@aws-amplify/backend"

export const detectLanguage = defineFunction({
  name: "detect-language",
  entry: "./main.ts",
  runtime: 22,
})
