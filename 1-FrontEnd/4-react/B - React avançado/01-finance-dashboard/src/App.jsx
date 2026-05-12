import Sidebar from './components/Sidebar'
import StatCard from './components/StatCard'
import './App.css'

function App() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="content">
        <header>
          <h1>Overview Financeiro</h1>
          <div className="user-info">Cristiano Sword</div>
        </header>
        
        <div className="stats-grid">
          <StatCard title="Saldo Total" value="R$ 12.500,00" type="balance" />
          <StatCard title="Entradas" value="R$ 5.200,00" type="income" />
          <StatCard title="Saídas" value="R$ 1.800,00" type="expense" />
        </div>

        <div className="charts-placeholder">
          <div className="card">Área do Gráfico Principal</div>
        </div>
      </main>
    </div>
  )
}

export default App
