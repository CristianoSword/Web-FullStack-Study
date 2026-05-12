import { useReducer, useMemo } from 'react'
import Sidebar from './components/Sidebar'
import StatCard from './components/StatCard'
import TransactionForm from './components/TransactionForm'
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

  const addTransaction = (transaction) => {
    dispatch({ type: 'ADD', payload: transaction })
  }

  // Otimizando cálculos pesados com useMemo
  const totals = useMemo(() => {
    return transactions.reduce((acc, item) => {
      if (item.type === 'income') acc.income += item.amount
      else acc.expense += item.amount
      acc.balance = acc.income - acc.expense
      return acc
    }, { income: 0, expense: 0, balance: 0 })
  }, [transactions])

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

        <div className="dashboard-grid">
          <div className="left-panel">
            <TransactionForm onAdd={addTransaction} />
            <div className="card list-card">
              <h3>Últimas Transações</h3>
              <ul className="transaction-list">
                {transactions.map(item => (
                  <li key={item.id} className={item.type}>
                    <span>{item.text}</span>
                    <div className="amount-info">
                      <strong className={item.type}>
                        {item.type === 'income' ? '+' : '-'} R$ {item.amount.toLocaleString('pt-BR')}
                      </strong>
                      <button className="del-btn" onClick={() => dispatch({ type: 'DELETE', payload: item.id })}>×</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="right-panel">
             <div className="card chart-card">
               <h3>Distribuição de Gastos</h3>
               <div className="placeholder-chart">Gráfico virá em breve...</div>
             </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
