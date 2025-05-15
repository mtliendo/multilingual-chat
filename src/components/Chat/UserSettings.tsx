import React, { useState } from "react"
import { motion } from "framer-motion"
import { User } from "lucide-react"
import { useChat } from "../../context/ChatContext"

const UserSettings: React.FC = () => {
  const { currentUser, setUsername } = useChat()
  const [isEditing, setIsEditing] = useState(false)
  const [tempUsername, setTempUsername] = useState(currentUser.name)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (tempUsername.trim()) {
      setUsername(tempUsername.trim())
      setIsEditing(false)
    }
  }

  return (
    <div className="relative">
      {isEditing ? (
        <motion.form
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center gap-2"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={tempUsername}
            onChange={(e) => setTempUsername(e.target.value)}
            className="input-primary text-sm py-1 px-2"
            placeholder="Enter username"
            autoFocus
          />
          <button type="submit" className="btn btn-primary btn-sm">
            Save
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => {
              setTempUsername(currentUser.name)
              setIsEditing(false)
            }}
          >
            Cancel
          </button>
        </motion.form>
      ) : (
        <motion.button
          onClick={() => setIsEditing(true)}
          className="btn btn-ghost flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <User size={16} className="text-gray-500" />
          <span>{currentUser.name}</span>
        </motion.button>
      )}
    </div>
  )
}

export default UserSettings
