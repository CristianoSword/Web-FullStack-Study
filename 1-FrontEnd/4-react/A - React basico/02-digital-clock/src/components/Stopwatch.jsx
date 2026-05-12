import { useState } from 'react'

function Stopwatch() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  return (
    <div className="stopwatch">
      <h2>Cronômetro</h2>
      <div className="time-display">
        00:00:00.00
      </div>
      <div className="controls">
        <button>Iniciar</button>
        <button>Resetar</button>
      </div>
    </div>
  )
}

export default Stopwatch
