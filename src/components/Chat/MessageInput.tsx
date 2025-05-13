import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

const MessageInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const { sendMessage } = useChat();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    // Focus input on component mount
    inputRef.current?.focus();
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  // Handle text area resize as content grows
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    target.style.height = 'auto';
    target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
  };
  
  const toggleRecording = () => {
    // This would be implemented with a real speech-to-text API
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Start recording simulation
      setTimeout(() => {
        setMessage(prev => prev + " I'm speaking now...");
        setIsRecording(false);
      }, 2000);
    }
  };

  return (
    <motion.div 
      className="border-t border-gray-200 bg-white p-4"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <textarea
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Type a message in any language..."
          className="input-primary min-h-[44px] max-h-[120px] resize-none flex-1"
          style={{ height: '44px' }}
        />
        
        <motion.button
          type="button"
          onClick={toggleRecording}
          className={`rounded-full p-3 ${
            isRecording ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'
          } hover:bg-opacity-80 transition-colors`}
          whileTap={{ scale: 0.95 }}
        >
          <Mic size={20} />
        </motion.button>
        
        <motion.button
          type="submit"
          disabled={!message.trim()}
          className={`rounded-full p-3 ${
            message.trim() ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-400'
          } transition-colors`}
          whileTap={{ scale: 0.95 }}
        >
          <Send size={20} />
        </motion.button>
      </form>
    </motion.div>
  );
};

export default MessageInput;