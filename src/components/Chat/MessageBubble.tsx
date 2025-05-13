import React from 'react';
import { motion } from 'framer-motion';
import { Message, SupportedLanguage } from '../../types';
import { getLanguageColor, getLanguageByCode } from '../../constants/languages';

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
  viewingOriginal: boolean;
  displayLanguage: SupportedLanguage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isCurrentUser,
  viewingOriginal,
  displayLanguage
}) => {
  // Determine which text to display based on viewing mode
  const displayText = viewingOriginal
    ? message.originalText
    : message.translations[displayLanguage];
    
  const languageCode = viewingOriginal
    ? message.originalLanguage
    : displayLanguage;
    
  const language = languageCode ? getLanguageByCode(languageCode) : null;
  const languageClassName = languageCode ? getLanguageColor(languageCode) : '';
  
  // Format time (e.g., "2:30 PM")
  const formattedTime = message.timestamp.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <motion.div
      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {!isCurrentUser && (
        <div className="flex-shrink-0 mr-2">
          <img 
            src={`https://randomuser.me/api/portraits/${message.senderId === '5' ? 'men' : message.senderId === '4' || message.senderId === '2' ? 'women' : 'men'}/${30 + parseInt(message.senderId, 10)}.jpg`} 
            alt={message.senderName}
            className="w-8 h-8 rounded-full"
          />
        </div>
      )}
      
      <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
        {!isCurrentUser && (
          <span className="text-sm text-gray-600 mb-1">{message.senderName}</span>
        )}
        
        <div className={isCurrentUser ? 'message-bubble-user' : 'message-bubble-other'}>
          <p className="text-sm sm:text-base whitespace-pre-wrap break-words">{displayText}</p>
          
          <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mt-1 items-center gap-2`}>
            <span className="text-xs opacity-75">{formattedTime}</span>
            
            {language && (
              <span className={`language-badge ${languageClassName}`}>
                {language.flag} {language.code.toUpperCase()}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {isCurrentUser && (
        <div className="flex-shrink-0 ml-2">
          <img 
            src="https://randomuser.me/api/portraits/men/32.jpg" 
            alt="You"
            className="w-8 h-8 rounded-full"
          />
        </div>
      )}
    </motion.div>
  );
};

export default MessageBubble;