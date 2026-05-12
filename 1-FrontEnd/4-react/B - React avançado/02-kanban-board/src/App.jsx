import { useState } from 'react'
import { useKanban } from './hooks/useKanban'
import TaskCard from './components/TaskCard'
import Modal from './components/Modal'
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
  const { columns, setColumns, moveTask } = useKanban(initialData)
  const [isModalOpen, setModalOpen] = useState(false)
  const [newTaskContent, setNewTaskContent] = useState('')

  const handleMove = (taskId, currentCol) => {
    const nextColMap = {
      todo: 'doing',
      doing: 'done'
    }
    const nextCol = nextColMap[currentCol]
    if (nextCol) moveTask(taskId, currentCol, nextCol)
  }

  const handleAddTask = () => {
    if (!newTaskContent) return
    const newTask = {
      id: Date.now().toString(),
      content: newTaskContent
    }
    setColumns({
      ...columns,
      todo: [...columns.todo, newTask]
    })
    setNewTaskContent('')
    setModalOpen(false)
  }

  return (
    <div className="kanban-container">
      <header className="board-header">
        <h1>Kanban Board</h1>
        <button className="add-task-btn" onClick={() => setModalOpen(true)}>+ Nova Tarefa</button>
      </header>
      
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

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2>Adicionar Nova Tarefa</h2>
        <textarea 
          placeholder="O que precisa ser feito?" 
          value={newTaskContent}
          onChange={e => setNewTaskContent(e.target.value)}
        />
        <button className="submit-task-btn" onClick={handleAddTask}>Criar Tarefa</button>
      </Modal>
    </div>
  )
}

export default App
