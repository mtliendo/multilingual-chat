export type SupportedLanguage = "en" | "es" | "fr"

export type LanguageOption = {
  code: SupportedLanguage
  name: string
  flag: string
}

export type MessageTranslations = Record<SupportedLanguage, string>

export interface Message {
  id: string
  senderId: string
  senderName: string
  originalText: string
  originalLanguage: SupportedLanguage
  translations: MessageTranslations
  timestamp: Date
  isTranslated: boolean
}

export interface User {
  id: string
  name: string
  preferredLanguage: SupportedLanguage
  avatar?: string
}
