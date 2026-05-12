import { useState, useEffect } from 'react'
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useKanban } from './hooks/useKanban'
import DraggableTask from './components/DraggableTask'
import DroppableColumn from './components/DroppableColumn'
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
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over) return

    const taskId = active.id
    const sourceCol = active.data.current.columnId
    const destCol = over.id

    if (sourceCol !== destCol) {
      moveTask(taskId, sourceCol, destCol)
    }
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
        <div className="header-actions">
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
          <button className="add-task-btn" onClick={() => setModalOpen(true)}>+ Nova Tarefa</button>
        </div>
      </header>
      
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="board">
          {Object.entries(columns).map(([id, tasks]) => (
            <DroppableColumn key={id} id={id}>
              {tasks.map(task => (
                <DraggableTask 
                  key={task.id} 
                  task={task} 
                  columnId={id} 
                />
              ))}
            </DroppableColumn>
          ))}
        </div>
      </DndContext>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2>Nova Tarefa</h2>
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
