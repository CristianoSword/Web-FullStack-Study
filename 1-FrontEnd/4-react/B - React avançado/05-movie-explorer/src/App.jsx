import './App.css'

function App() {
  return (
    <div className="movie-app">
      <header>
        <h1>CineExplorer</h1>
        <div className="search-box">
          <input type="text" placeholder="Buscar filmes..." />
        </div>
      </header>
      
      <main className="movie-grid">
        <div className="movie-card-placeholder">Carregando filmes...</div>
      </main>
    </div>
  )
}

export default App
