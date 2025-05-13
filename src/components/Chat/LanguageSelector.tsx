import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SUPPORTED_LANGUAGES } from "../../constants/languages"
import { useChat } from "../../context/ChatContext"
import { SupportedLanguage } from "../../types"
import { Globe, Check } from "lucide-react"

const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    setUserPreferredLanguage,
    currentUser,
    viewingOriginal,
    toggleViewOriginal,
  } = useChat()

  const handleLanguageSelect = (language: SupportedLanguage) => {
    setUserPreferredLanguage(language)
    setIsOpen(false)
  }

  const selectedLanguage = SUPPORTED_LANGUAGES.find(
    (lang) => lang.code === currentUser.preferredLanguage
  )

  return (
    <div className="relative">
      <div className="flex gap-2">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="btn btn-ghost flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-xl">{selectedLanguage?.flag}</span>
          <span className="hidden sm:inline">{selectedLanguage?.name}</span>
          <Globe size={16} className="text-gray-500" />
        </motion.button>

        <motion.button
          onClick={toggleViewOriginal}
          className={`btn ${viewingOriginal ? "btn-primary" : "btn-ghost"}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {viewingOriginal ? "Viewing Original" : "View Translated"}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="glass-panel absolute top-full right-0 mt-2 w-48 rounded-lg shadow-lg z-10"
          >
            <div className="p-2">
              {SUPPORTED_LANGUAGES.map((language) => (
                <motion.button
                  key={language.code}
                  onClick={() =>
                    handleLanguageSelect(language.code as SupportedLanguage)
                  }
                  className={`flex items-center gap-2 w-full text-left px-4 py-2 rounded-md ${
                    currentUser.preferredLanguage === language.code
                      ? "bg-primary-100 text-primary-800"
                      : "hover:bg-gray-100"
                  }`}
                  whileHover={{ x: 4 }}
                >
                  <span className="text-xl">{language.flag}</span>
                  <span>{language.name}</span>
                  {currentUser.preferredLanguage === language.code && (
                    <Check size={16} className="ml-auto text-primary-600" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LanguageSelector
