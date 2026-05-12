import { useState } from 'react'
import TodoInput from './components/TodoInput'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false
    }
    setTodos([...todos, newTodo])
  }

  return (
    <div className="app-container">
      <h1>Task Master</h1>
      <TodoInput onAdd={addTodo} />
      <div className="todo-list">
        {todos.length === 0 ? (
          <p>Nenhuma tarefa pendente.</p>
        ) : (
          <ul>
            {todos.map(todo => (
              <li key={todo.id}>{todo.text}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
