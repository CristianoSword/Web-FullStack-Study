import { useState } from 'react'

function TransactionForm({ onAdd }) {
  const [text, setText] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('income')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text || !amount) return
    onAdd({
      id: Date.now(),
      text,
      amount: parseFloat(amount),
      type,
      date: new Date().toISOString().split('T')[0]
    })
    setText('')
    setAmount('')
  }

  return (
    <form className="transaction-form card" onSubmit={handleSubmit}>
      <h3>Nova Transação</h3>
      <div className="input-group">
        <input 
          type="text" 
          placeholder="Descrição..." 
          value={text} 
          onChange={e => setText(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Valor..." 
          value={amount} 
          onChange={e => setAmount(e.target.value)} 
        />
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="income">Entrada</option>
          <option value="expense">Saída</option>
        </select>
        <button type="submit">Adicionar</button>
      </div>
    </form>
  )
}

export default TransactionForm
