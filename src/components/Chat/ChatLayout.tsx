import { useEffect, useRef, MutableRefObject } from "react"
import { motion } from "framer-motion"
import ChatHeader from "./ChatHeader"
import MessageList from "./MessageList"
import MessageInput from "./MessageInput"
import UserSettings from "./UserSettings"
import { events, generateClient } from "aws-amplify/api"
import { EventsChannel } from "aws-amplify/api"
import { Schema } from "../../../amplify/data/resource"
import { useChat } from "../../context/ChatContext"

const client = generateClient<Schema>()
//additonal info: The supported languagees are : ["en", "es", "fr"]
const ChatLayout = () => {
  const { currentUser, addMessage } = useChat()
  const sub = useRef<ReturnType<EventsChannel["subscribe"]> | null>(
    null
  ) as MutableRefObject<ReturnType<EventsChannel["subscribe"]> | null>

  const handleIncomingEvent = (data: any) => {
    // sample incoming data.event
    //   {
    //     "translations": {
    //         "spanish": "¡Divirtiéndose en el Ping!",
    //         "english": "Having fun at the Ping!",
    //         "french": "On s'amuse bien au Ping !"
    //     },
    //     "originalLanguage": "en",
    //     "user": "Michael Liendo"
    // }
    if (data.event) {
      addMessage(data.event)
    }
  }

  useEffect(() => {
    let channel: EventsChannel

    const connectAndSubscribe = async () => {
      channel = await events.connect("seattle-meetup/multi-lingual-chat")

      if (!sub.current) {
        sub.current = channel.subscribe({
          next: handleIncomingEvent,
          error: (err) => console.error("error", err),
        })
      }
    }

    connectAndSubscribe()

    return () => {
      sub.current?.unsubscribe()
      sub.current = null
      return channel?.close()
    }
  }, [])

  const handleSendMessage = async (message: string) => {
    await client.mutations.invokeOrkesConductor(
      {
        messageText: message,
        username: currentUser.name,
      },
      { authMode: "apiKey" }
    )
  }

  return (
    <motion.div
      className="max-w-3xl mx-auto h-screen flex flex-col bg-gray-50 shadow-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <ChatHeader />
        <div className="p-4">
          <UserSettings />
        </div>
      </div>
      <MessageList />
      <MessageInput onSendMessage={handleSendMessage} />
    </motion.div>
  )
}

export default ChatLayout
