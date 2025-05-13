import { v4 as uuidv4 } from 'uuid';
import { Message, User } from '../types';
import { detectLanguage, SUPPORTED_LANGUAGES, translateText } from '../constants/languages';

// Mock users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'You',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    preferredLanguage: 'en'
  },
  {
    id: '2',
    name: 'Maria Garcia',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    preferredLanguage: 'es'
  },
  {
    id: '3',
    name: 'Hans Schmidt',
    avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
    preferredLanguage: 'de'
  },
  {
    id: '4',
    name: 'Sophie Dubois',
    avatar: 'https://randomuser.me/api/portraits/women/19.jpg',
    preferredLanguage: 'fr'
  },
  {
    id: '5',
    name: '李小明',
    avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
    preferredLanguage: 'zh'
  }
];

// Generate a mock message with translations to all supported languages
export const createMockMessage = (
  senderId: string, 
  text: string, 
  timestampOffset = 0
): Message => {
  const sender = mockUsers.find(user => user.id === senderId) || mockUsers[0];
  const detectedLanguage = detectLanguage(text) as any;
  
  // Create translations for all supported languages
  const translations = SUPPORTED_LANGUAGES.reduce((acc, lang) => {
    acc[lang.code] = translateText(text, detectedLanguage, lang.code);
    return acc;
  }, {} as any);
  
  return {
    id: uuidv4(),
    senderId,
    senderName: sender.name,
    originalText: text,
    originalLanguage: detectedLanguage,
    translations,
    timestamp: new Date(Date.now() - timestampOffset),
    isTranslated: true
  };
};

// Initial mock messages
export const mockMessages: Message[] = [
  createMockMessage('2', '¡Hola! ¿Cómo están todos hoy?', 300000),
  createMockMessage('3', 'Guten Tag! Ich bin neu hier.', 240000),
  createMockMessage('4', 'Bonjour tout le monde! Comment ça va?', 180000),
  createMockMessage('5', '大家好！很高兴见到你们。', 120000),
  createMockMessage('1', 'Hello everyone! Welcome to our multilingual chat!', 60000),
];