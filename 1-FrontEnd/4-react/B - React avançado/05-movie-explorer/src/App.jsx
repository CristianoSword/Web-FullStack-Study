import { useState, useRef, useCallback } from 'react'
import { useMovies } from './hooks/useMovies'
import { useDebounce } from './hooks/useDebounce'
import './App.css'

function App() {
  const [searchInput, setSearchInput] = useState('')
  const [page, setPage] = useState(1)
  
  // Otimizando busca com Debounce
  const debouncedSearch = useDebounce(searchInput, 500)
  const { movies, loading, hasMore } = useMovies(debouncedSearch, page)
  
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
    setSearchInput(e.target.value)
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
            value={searchInput}
            onChange={handleSearch}
          />
        </div>
      </header>
      
      <main className="movie-grid">
        {movies.map((movie, index) => {
          const isLast = movies.length === index + 1
          return (
            <div 
              ref={isLast ? lastMovieRef : null} 
              key={movie.id} 
              className="movie-card"
            >
              <img src={movie.poster} alt={movie.title} />
              <div className="info">
                <h3>{movie.title}</h3>
                <div className="meta">
                  <span>⭐ {movie.rating}</span>
                  <span className="year">{movie.year}</span>
                </div>
              </div>
            </div>
          )
        })}
        {loading && <div className="loading">Carregando filmes...</div>}
      </main>
    </div>
  )
}

export default App
