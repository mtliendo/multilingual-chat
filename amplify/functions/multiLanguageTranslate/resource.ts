import { defineFunction } from "@aws-amplify/backend"

export const multiLanguageTranslate = defineFunction({
  name: "multi-language-translate",
  entry: "./main.ts",
  runtime: 22,
})
