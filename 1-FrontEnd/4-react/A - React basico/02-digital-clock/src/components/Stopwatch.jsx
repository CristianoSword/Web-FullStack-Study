import { useState, useEffect } from 'react'

function Stopwatch() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [laps, setLaps] = useState([])

  useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10)
      }, 10)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000)
    const minutes = Math.floor((time % 3600000) / 60000)
    const seconds = Math.floor((time % 60000) / 1000)
    const milliseconds = Math.floor((time % 1000) / 10)

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`
  }

  const addLap = () => {
    setLaps([time, ...laps])
  }

  const reset = () => {
    setTime(0)
    setIsRunning(false)
    setLaps([])
  }

  return (
    <div className="stopwatch">
      <h2>Cronômetro</h2>
      <div className="time-display">
        {formatTime(time)}
      </div>
      <div className="controls">
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? 'Pausar' : 'Iniciar'}
        </button>
        <button onClick={addLap} disabled={!isRunning}>
          Volta
        </button>
        <button onClick={reset}>
          Resetar
        </button>
      </div>
      {laps.length > 0 && (
        <ul className="laps">
          {laps.map((lap, index) => (
            <li key={index}>
              <span>Volta {laps.length - index}</span>
              <span>{formatTime(lap)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Stopwatch
