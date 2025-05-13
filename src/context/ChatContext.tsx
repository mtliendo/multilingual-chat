import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message, User, SupportedLanguage } from '../types';
import { mockMessages, mockUsers } from '../utils/mock-data';
import { detectLanguage, translateText, SUPPORTED_LANGUAGES } from '../constants/languages';

interface ChatContextProps {
  messages: Message[];
  currentUser: User;
  users: User[];
  sendMessage: (text: string) => void;
  setUserPreferredLanguage: (language: SupportedLanguage) => void;
  viewingOriginal: boolean;
  toggleViewOriginal: () => void;
  displayLanguage: SupportedLanguage;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [users] = useState<User[]>(mockUsers);
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]);
  const [viewingOriginal, setViewingOriginal] = useState(false);

  // Mock send message functionality
  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    
    const detectedLanguage = detectLanguage(text) as SupportedLanguage;
    
    // Create translations for all supported languages
    const translations = SUPPORTED_LANGUAGES.reduce((acc, lang) => {
      acc[lang.code] = translateText(text, detectedLanguage, lang.code);
      return acc;
    }, {} as Record<SupportedLanguage, string>);
    
    const newMessage: Message = {
      id: uuidv4(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      originalText: text,
      originalLanguage: detectedLanguage,
      translations,
      timestamp: new Date(),
      isTranslated: true
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
    
    // Simulate response from another user after a delay
    setTimeout(() => {
      const otherUsers = users.filter(user => user.id !== currentUser.id);
      const randomUser = otherUsers[Math.floor(Math.random() * otherUsers.length)];
      
      const responseOptions = [
        'That sounds interesting!',
        'Thanks for sharing.',
        'I agree with you.',
        'Could you tell me more?',
        'That\'s exactly what I was thinking!'
      ];
      
      const randomResponse = responseOptions[Math.floor(Math.random() * responseOptions.length)];
      
      // Translate to user's preferred language
      const translatedResponse = translateText(
        randomResponse, 
        'en', 
        randomUser.preferredLanguage
      );
      
      // Create response in user's preferred language
      const responseLanguage = randomUser.preferredLanguage;
      
      // Create translations for all supported languages
      const responseTranslations = SUPPORTED_LANGUAGES.reduce((acc, lang) => {
        acc[lang.code] = translateText(translatedResponse, responseLanguage, lang.code);
        return acc;
      }, {} as Record<SupportedLanguage, string>);
      
      const responseMessage: Message = {
        id: uuidv4(),
        senderId: randomUser.id,
        senderName: randomUser.name,
        originalText: translatedResponse,
        originalLanguage: responseLanguage,
        translations: responseTranslations,
        timestamp: new Date(),
        isTranslated: true
      };
      
      setMessages(prevMessages => [...prevMessages, responseMessage]);
    }, 3000);
  };
  
  const setUserPreferredLanguage = (language: SupportedLanguage) => {
    setCurrentUser(prevUser => ({
      ...prevUser,
      preferredLanguage: language
    }));
  };
  
  const toggleViewOriginal = () => {
    setViewingOriginal(prev => !prev);
  };
  
  const value = {
    messages,
    currentUser,
    users,
    sendMessage,
    setUserPreferredLanguage,
    viewingOriginal,
    toggleViewOriginal,
    displayLanguage: currentUser.preferredLanguage
  };
  
  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextProps => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};