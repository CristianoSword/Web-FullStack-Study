import { useState, useRef, useCallback } from 'react'
import { useMovies } from './hooks/useMovies'
import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const { movies, loading, hasMore } = useMovies(query, page)
  
  const observer = useRef()
  const lastMovieRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  const handleSearch = (e) => {
    setQuery(e.target.value)
    setPage(1)
  }

  return (
    <div className="movie-app">
      <header>
        <h1>CineExplorer</h1>
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Buscar filmes..." 
            value={query}
            onChange={handleSearch}
          />
        </div>
      </header>
      
      <main className="movie-grid">
        {movies.map((movie, index) => {
          if (movies.length === index + 1) {
            return (
              <div ref={lastMovieRef} key={movie.id} className="movie-card">
                <img src={movie.poster} alt={movie.title} />
                <div className="info">
                  <h3>{movie.title}</h3>
                  <span>⭐ {movie.rating}</span>
                </div>
              </div>
            )
          } else {
            return (
              <div key={movie.id} className="movie-card">
                <img src={movie.poster} alt={movie.title} />
                <div className="info">
                  <h3>{movie.title}</h3>
                  <span>⭐ {movie.rating}</span>
                </div>
              </div>
            )
          }
        })}
        {loading && <div className="loading">Carregando mais...</div>}
      </main>
    </div>
  )
}

export default App
