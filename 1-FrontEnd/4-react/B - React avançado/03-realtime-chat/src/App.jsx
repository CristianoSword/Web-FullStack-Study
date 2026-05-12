import { useState, useEffect, useRef } from 'react'
import Modal from './components/Modal'
import MessageList from './components/MessageList'
import './App.css'

function App() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Olá! Como você está?', sender: 'them', time: '10:00' },
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isSettingsOpen, setSettingsOpen] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem('chat-theme') || 'light')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('chat-theme', theme)
  }, [theme])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

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
      setIsTyping(true)
      const timer = setTimeout(() => {
        const reply = {
          id: Date.now() + 1,
          text: 'Recebi sua mensagem! Vou verificar isso agora mesmo.',
          sender: 'them',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        setMessages(prev => [...prev, reply])
        setIsTyping(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [messages])

  return (
    <div className="chat-container">
      <aside className="chat-sidebar">
        <div className="sidebar-header">
          <span>Mensagens</span>
          <button className="settings-btn" onClick={() => setSettingsOpen(true)}>⚙️</button>
        </div>
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
          <button className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </header>
        
        <MessageList 
          messages={messages} 
          isTyping={isTyping} 
          messagesEndRef={messagesEndRef} 
        />

        <footer className="chat-footer">
          <input 
            type="text" 
            placeholder="Digite sua mensagem..." 
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
          />
          <button className="send-btn" onClick={handleSend}>Enviar</button>
        </footer>
      </main>

      <Modal isOpen={isSettingsOpen} onClose={() => setSettingsOpen(false)}>
        <h2>Configurações</h2>
        <div className="settings-options">
          <div className="option">
            <label>Notificações</label>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="option">
            <label>Confirmação de Leitura</label>
            <input type="checkbox" defaultChecked />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default App
