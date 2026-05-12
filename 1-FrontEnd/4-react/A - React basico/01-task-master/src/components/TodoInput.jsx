import { useState } from 'react'

function TodoInput() {
  const [text, setText] = useState('')

  return (
    <div className="todo-input">
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)}
        placeholder="Adicione uma nova tarefa..."
      />
      <button>Adicionar</button>
    </div>
  )
}

export default TodoInput
