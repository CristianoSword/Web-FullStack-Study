import { memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MessageList = memo(({ messages, isTyping, messagesEndRef }) => {
  return (
    <div className="message-area">
      <AnimatePresence initial={false}>
        {messages.map(msg => (
          <motion.div 
            key={msg.id} 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`message-bubble ${msg.sender}`}
          >
            <div className="bubble">
              <p>{msg.text}</p>
              <span className="time">{msg.time}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {isTyping && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="message-bubble them"
        >
          <div className="bubble typing">
            <span></span><span></span><span></span>
          </div>
        </motion.div>
      )}
      <div ref={messagesEndRef} />
    </div>
  )
})

export default MessageList
