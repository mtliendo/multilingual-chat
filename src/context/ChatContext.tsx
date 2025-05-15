import React, { createContext, useState, useContext } from "react"
import { v4 as uuidv4 } from "uuid"
import { Message, User, SupportedLanguage } from "../types"
import { SUPPORTED_LANGUAGES } from "../constants/languages"

interface ChatContextProps {
  messages: Message[]
  currentUser: User
  sendMessage: (text: string) => void
  setUserPreferredLanguage: (language: SupportedLanguage) => void
  setUsername: (name: string) => void
  viewingOriginal: boolean
  toggleViewOriginal: () => void
  displayLanguage: SupportedLanguage
  addMessage: (messageData: any) => void
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined)

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentUser, setCurrentUser] = useState<User>({
    id: uuidv4(),
    name: "Guest User",
    preferredLanguage: "en",
  })
  const [viewingOriginal, setViewingOriginal] = useState(false)

  const setUsername = (name: string) => {
    setCurrentUser((prev) => ({
      ...prev,
      name,
    }))
  }

  const setUserPreferredLanguage = (language: SupportedLanguage) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      preferredLanguage: language,
    }))
  }

  const toggleViewOriginal = () => {
    setViewingOriginal((prev) => !prev)
  }

  const addMessage = (messageData: any) => {
    const newMessage: Message = {
      id: uuidv4(),
      senderId: messageData.user,
      senderName: messageData.user,
      originalText: messageData.translations[messageData.originalLanguage],
      originalLanguage: messageData.originalLanguage,
      translations: {
        en: messageData.translations.english,
        es: messageData.translations.spanish,
        fr: messageData.translations.french,
      },
      timestamp: new Date(),
      isTranslated: true,
    }

    setMessages((prevMessages) => [...prevMessages, newMessage])
  }

  const value = {
    messages,
    currentUser,
    sendMessage: () => {}, // This will be provided by ChatLayout
    setUserPreferredLanguage,
    setUsername,
    viewingOriginal,
    toggleViewOriginal,
    displayLanguage: currentUser.preferredLanguage,
    addMessage,
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export const useChat = (): ChatContextProps => {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}

export const useChatActions = () => {
  return {
    addMessage: (messageData: any) => {
      const context = useContext(ChatContext)
      if (context === undefined) {
        throw new Error("useChatActions must be used within a ChatProvider")
      }
      const newMessage: Message = {
        id: uuidv4(),
        senderId: messageData.user,
        senderName: messageData.user,
        originalText: messageData.translations[messageData.originalLanguage],
        originalLanguage: messageData.originalLanguage,
        translations: {
          en: messageData.translations.english,
          es: messageData.translations.spanish,
          fr: messageData.translations.french,
        },
        timestamp: new Date(),
        isTranslated: true,
      }

      context.messages.push(newMessage)
    },
  }
}
