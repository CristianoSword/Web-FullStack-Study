import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Olá! Como você está?', sender: 'them', time: '10:00' },
  ])
  const [inputText, setInputText] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!inputText) return
    const newMsg = {
      id: Date.now(),
      text: inputText,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages([...messages, newMsg])
    setInputText('')
  }

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === 'me') {
      const timer = setTimeout(() => {
        const reply = {
          id: Date.now(),
          text: 'Recebi sua mensagem! Vou verificar isso agora mesmo.',
          sender: 'them',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        setMessages(prev => [...prev, reply])
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [messages])

  return (
    <div className="chat-container">
      <aside className="chat-sidebar">
        <div className="sidebar-header">Mensagens</div>
        <div className="user-list">
          <div className="user-item active">
            <div className="avatar">JD</div>
            <div className="user-info">
              <h4>John Doe</h4>
              <p>Online</p>
            </div>
          </div>
          <div className="user-item">
            <div className="avatar">AS</div>
            <div className="user-info">
              <h4>Alice Smith</h4>
              <p className="offline">Visto por último há 2h</p>
            </div>
          </div>
        </div>
      </aside>
      
      <main className="chat-main">
        <header className="chat-header">
          <h3>John Doe</h3>
        </header>
        <div className="message-area">
          {messages.map(msg => (
            <div key={msg.id} className={`message-bubble ${msg.sender}`}>
              <div className="bubble">
                <p>{msg.text}</p>
                <span className="time">{msg.time}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <footer className="chat-footer">
          <input 
            type="text" 
            placeholder="Digite sua mensagem..." 
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}>Enviar</button>
        </footer>
      </main>
    </div>
  )
}

export default App
