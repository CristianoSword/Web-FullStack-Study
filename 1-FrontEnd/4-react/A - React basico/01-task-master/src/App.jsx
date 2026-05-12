import TodoInput from './components/TodoInput'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <h1>Task Master</h1>
      <TodoInput />
      <div className="todo-list">
        {/* Lista virá no próximo commit */}
        <p>Nenhuma tarefa pendente.</p>
      </div>
    </div>
  )
}

export default App
