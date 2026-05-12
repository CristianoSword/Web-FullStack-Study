import { useReducer } from 'react'
import Sidebar from './components/Sidebar'
import StatCard from './components/StatCard'
import './App.css'

const initialState = [
  { id: 1, text: 'Salário', amount: 5000, type: 'income', date: '2024-05-01' },
  { id: 2, text: 'Aluguel', amount: 1500, type: 'expense', date: '2024-05-05' },
]

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state]
    case 'DELETE':
      return state.filter(item => item.id !== action.payload)
    default:
      return state
  }
}

function App() {
  const [transactions, dispatch] = useReducer(reducer, initialState)

  const totals = transactions.reduce((acc, item) => {
    if (item.type === 'income') acc.income += item.amount
    else acc.expense += item.amount
    acc.balance = acc.income - acc.expense
    return acc
  }, { income: 0, expense: 0, balance: 0 })

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="content">
        <header>
          <h1>Overview Financeiro</h1>
          <div className="user-info">Cristiano Sword</div>
        </header>
        
        <div className="stats-grid">
          <StatCard title="Saldo Total" value={`R$ ${totals.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} type="balance" />
          <StatCard title="Entradas" value={`R$ ${totals.income.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} type="income" />
          <StatCard title="Saídas" value={`R$ ${totals.expense.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} type="expense" />
        </div>

        <div className="transaction-section">
          <div className="card">
            <h3>Últimas Transações</h3>
            <ul className="transaction-list">
              {transactions.map(item => (
                <li key={item.id} className={item.type}>
                  <span>{item.text}</span>
                  <strong>{item.type === 'income' ? '+' : '-'} R$ {item.amount.toLocaleString('pt-BR')}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
