import { useState } from 'react'
import Clock from './components/Clock'
import Stopwatch from './components/Stopwatch'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('clock')

  return (
    <div className="app-container">
      <header>
        <h1>Relógio & Timer</h1>
        <nav>
          <button 
            className={activeTab === 'clock' ? 'active' : ''} 
            onClick={() => setActiveTab('clock')}
          >
            Relógio
          </button>
          <button 
            className={activeTab === 'stopwatch' ? 'active' : ''} 
            onClick={() => setActiveTab('stopwatch')}
          >
            Cronômetro
          </button>
        </nav>
      </header>

      <main>
        {activeTab === 'clock' ? <Clock /> : <Stopwatch />}
      </main>
    </div>
  )
}

export default App
