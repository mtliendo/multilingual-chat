import React from "react"
import { motion } from "framer-motion"
import ChatHeader from "./ChatHeader"
import MessageList from "./MessageList"
import MessageInput from "./MessageInput"

const ChatLayout: React.FC = () => {
  return (
    <motion.div
      className="max-w-3xl mx-auto h-screen flex flex-col bg-gray-50 shadow-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ChatHeader />
      <MessageList />
      <MessageInput />
    </motion.div>
  )
}

export default ChatLayout
