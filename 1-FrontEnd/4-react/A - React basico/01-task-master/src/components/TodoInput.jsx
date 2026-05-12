import { useState } from 'react'

function TodoInput({ onAdd }) {
  const [text, setText] = useState('')

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text)
      setText('')
    }
  }

  return (
    <div className="todo-input">
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
        placeholder="Adicione uma nova tarefa..."
      />
      <button onClick={handleAdd}>Adicionar</button>
    </div>
  )
}

export default TodoInput
