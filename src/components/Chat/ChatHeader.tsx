import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

const ChatHeader: React.FC = () => {
  return (
    <motion.div 
      className="sticky top-0 z-10 glass-panel border-b border-gray-200 p-4 flex justify-between items-center"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      <div className="flex items-center gap-2">
        <motion.div
          whileHover={{ rotate: 10 }}
          className="bg-primary-500 text-white p-2 rounded-xl"
        >
          <MessageSquare size={24} />
        </motion.div>
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Multilingual Chat</h1>
          <p className="text-sm text-gray-500">Communicate in any language</p>
        </div>
      </div>
      
      <LanguageSelector />
    </motion.div>
  );
};

export default ChatHeader;