import Clock from './components/Clock'
import Stopwatch from './components/Stopwatch'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <h1>Relógio & Timer</h1>
      <Clock />
      <hr />
      <Stopwatch />
    </div>
  )
}

export default App
