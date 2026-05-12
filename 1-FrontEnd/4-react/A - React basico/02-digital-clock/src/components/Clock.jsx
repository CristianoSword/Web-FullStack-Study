import { useState, useEffect } from 'react'

function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="clock-display">
      <h2>Relógio Digital</h2>
      <div className="time">
        {time.toLocaleTimeString()}
      </div>
      <div className="date">
        {time.toLocaleDateString()}
      </div>
    </div>
  )
}

export default Clock
