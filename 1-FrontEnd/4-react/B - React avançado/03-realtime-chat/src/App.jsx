import './App.css'

function App() {
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
          <div className="msg-placeholder">Nenhuma mensagem ainda...</div>
        </div>
        <footer className="chat-footer">
          <input type="text" placeholder="Digite sua mensagem..." />
          <button>Enviar</button>
        </footer>
      </main>
    </div>
  )
}

export default App
