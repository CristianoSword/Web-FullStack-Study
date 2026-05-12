import { useKanban } from './hooks/useKanban'
import TaskCard from './components/TaskCard'
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
  const { columns, moveTask } = useKanban(initialData)

  const handleMove = (taskId, currentCol) => {
    const nextColMap = {
      todo: 'doing',
      doing: 'done'
    }
    const nextCol = nextColMap[currentCol]
    if (nextCol) moveTask(taskId, currentCol, nextCol)
  }

  return (
    <div className="kanban-container">
      <h1>Kanban Board</h1>
      <div className="board">
        {Object.entries(columns).map(([id, tasks]) => (
          <div key={id} className="column">
            <h3>{id.toUpperCase()}</h3>
            <div className="task-list">
              {tasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  columnId={id} 
                  onMove={handleMove} 
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
