export type SupportedLanguage = 'en' | 'es' | 'de' | 'fr' | 'zh';

export type LanguageOption = {
  code: SupportedLanguage;
  name: string;
  flag: string;
};

export type MessageTranslations = {
  [key in SupportedLanguage]: string;
};

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  originalText: string;
  originalLanguage: SupportedLanguage | null;
  translations: MessageTranslations;
  timestamp: Date;
  isTranslated: boolean;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  preferredLanguage: SupportedLanguage;
}