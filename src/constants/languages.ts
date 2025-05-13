import { LanguageOption } from '../types';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' }
];

export const getLanguageColor = (code: string): string => {
  const colors: Record<string, string> = {
    en: 'bg-blue-100 text-blue-800',
    es: 'bg-yellow-100 text-yellow-800',
    de: 'bg-gray-100 text-gray-800',
    fr: 'bg-indigo-100 text-indigo-800',
    zh: 'bg-red-100 text-red-800',
    default: 'bg-green-100 text-green-800'
  };

  return colors[code] || colors.default;
};

export const getLanguageByCode = (code: string): LanguageOption => {
  return SUPPORTED_LANGUAGES.find(lang => lang.code === code) || SUPPORTED_LANGUAGES[0];
};

export const detectLanguage = (text: string): string => {
  // This is a simple mock implementation
  // In a real app, you would use a proper language detection library or API
  
  // Simple language detection based on common words
  const lowerText = text.toLowerCase();
  
  if (/\b(the|is|and|to|of|a|in|that|have|i|it|for|not|on|with)\b/.test(lowerText)) {
    return 'en';
  }
  if (/\b(el|la|que|de|y|a|en|un|ser|se|no|haber|por|con|su|para)\b/.test(lowerText)) {
    return 'es';
  }
  if (/\b(der|die|das|und|zu|sie|ich|in|den|mit|ist|für|auf|nicht)\b/.test(lowerText)) {
    return 'de';
  }
  if (/\b(le|la|les|de|et|je|tu|il|un|être|avoir|que|dans|ce|qui)\b/.test(lowerText)) {
    return 'fr';
  }
  if (/[\u4e00-\u9fa5]/.test(text)) {
    return 'zh';
  }
  
  // Default to English if no match
  return 'en';
};

// Mock translation function
export const translateText = (text: string, from: string, to: string): string => {
  // In a real app, you would use a translation API like Google Translate
  
  if (from === to) return text;
  
  // Simple mock translations
  const mockTranslations: Record<string, Record<string, string>> = {
    'Hello everyone!': {
      en: 'Hello everyone!',
      es: '¡Hola a todos!',
      de: 'Hallo zusammen!',
      fr: 'Bonjour à tous!',
      zh: '大家好！'
    },
    'How are you doing?': {
      en: 'How are you doing?',
      es: '¿Cómo estás?',
      de: 'Wie geht es dir?',
      fr: 'Comment ça va?',
      zh: '你好吗？'
    },
    'I am fine, thank you!': {
      en: 'I am fine, thank you!',
      es: 'Estoy bien, ¡gracias!',
      de: 'Mir geht es gut, danke!',
      fr: 'Je vais bien, merci!',
      zh: '我很好，谢谢！'
    }
  };
  
  // If we have a predefined translation
  if (mockTranslations[text]?.[to]) {
    return mockTranslations[text][to];
  }
  
  // Otherwise, add a suffix to indicate translation
  return `${text} (${to})`;
};