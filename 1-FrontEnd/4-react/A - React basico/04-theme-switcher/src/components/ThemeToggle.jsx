import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {theme === 'light' ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
    </button>
  )
}

export default ThemeToggle
