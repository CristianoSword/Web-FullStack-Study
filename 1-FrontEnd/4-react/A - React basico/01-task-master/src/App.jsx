import { useState, useEffect } from 'react'
import TodoInput from './components/TodoInput'
import './App.css'

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false
    }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id, e) => {
    e.stopPropagation()
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="app-container">
      <header>
        <h1>Task Master</h1>
        <p>Gerencie suas tarefas diárias com simplicidade.</p>
      </header>
      <TodoInput onAdd={addTodo} />
      <div className="todo-list">
        {todos.length === 0 ? (
          <div className="empty-state">
            <p>Nenhuma tarefa pendente. Aproveite seu dia!</p>
          </div>
        ) : (
          <ul>
            {todos.map(todo => (
              <li 
                key={todo.id} 
                className={todo.completed ? 'completed' : ''}
                onClick={() => toggleTodo(todo.id)}
              >
                <span>{todo.text}</span>
                <button 
                  className="delete-btn"
                  onClick={(e) => deleteTodo(todo.id, e)}
                  title="Excluir tarefa"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
