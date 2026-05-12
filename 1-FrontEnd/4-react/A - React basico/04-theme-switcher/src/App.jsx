import { useContext } from 'react'
import { ThemeContext } from './context/ThemeContext'
import ThemeToggle from './components/ThemeToggle'
import './App.css'

function App() {
  const { theme } = useContext(ThemeContext)

  return (
    <div className={`app-container ${theme}`}>
      <header>
        <h1>Theme Switcher</h1>
        <ThemeToggle />
      </header>
      <main>
        <section className="card">
          <h2>Bem-vindo ao Modo {theme === 'light' ? 'Claro' : 'Escuro'}!</h2>
          <p>
            Este projeto demonstra o uso da Context API para gerenciar o tema global
            da aplicação sem a necessidade de passar props manualmente por cada nível.
          </p>
        </section>
        
        <div className="grid">
          <div className="card">Recurso 1</div>
          <div className="card">Recurso 2</div>
          <div className="card">Recurso 3</div>
        </div>
      </main>
    </div>
  )
}

export default App
