import { useState } from 'react'
import './App.css'

const initialData = {
  todo: [
    { id: '1', content: 'Estudar React Avançado' },
    { id: '2', content: 'Configurar Recharts' },
  ],
  doing: [
    { id: '3', content: 'Desenvolver Kanban' },
  ],
  done: [
    { id: '4', content: 'Finalizar Dashboard Financeiro' },
  ]
}

function App() {
  const [columns, setColumns] = useState(initialData)

  return (
    <div className="kanban-container">
      <h1>Kanban Board</h1>
      <div className="board">
        {Object.entries(columns).map(([id, tasks]) => (
          <div key={id} className="column">
            <h3>{id.toUpperCase()}</h3>
            <div className="task-list">
              {tasks.map(task => (
                <div key={task.id} className="task-card">
                  {task.content}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
