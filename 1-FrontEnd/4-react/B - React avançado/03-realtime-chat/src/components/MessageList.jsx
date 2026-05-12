import { memo } from 'react'

const MessageList = memo(({ messages, isTyping, messagesEndRef }) => {
  return (
    <div className="message-area">
      {messages.map(msg => (
        <div key={msg.id} className={`message-bubble ${msg.sender}`}>
          <div className="bubble">
            <p>{msg.text}</p>
            <span className="time">{msg.time}</span>
          </div>
        </div>
      ))}
      {isTyping && (
        <div className="message-bubble them">
          <div className="bubble typing">
            <span></span><span></span><span></span>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  )
})

export default MessageList
