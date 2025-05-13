import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import MessageBubble from './MessageBubble';
import { useChat } from '../../context/ChatContext';

const MessageList: React.FC = () => {
  const { messages, currentUser, viewingOriginal, displayLanguage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <motion.div 
      className="flex-1 p-4 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-4">
        {messages.map(message => (
          <MessageBubble
            key={message.id}
            message={message}
            isCurrentUser={message.senderId === currentUser.id}
            viewingOriginal={viewingOriginal}
            displayLanguage={displayLanguage}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </motion.div>
  );
};

export default MessageList;