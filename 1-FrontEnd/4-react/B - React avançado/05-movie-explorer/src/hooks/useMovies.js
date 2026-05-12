import { useState, useEffect } from 'react'

export function useMovies(query, page) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    setLoading(true)
    // Simulação de busca em API com delay
    const timer = setTimeout(() => {
      const newMovies = Array.from({ length: 12 }).map((_, i) => ({
        id: `${page}-${i}-${Date.now()}`,
        title: query ? `Resultado ${i} para "${query}"` : `Filme Popular ${page}-${i}`,
        poster: `https://picsum.photos/seed/${page}${i}/200/300`,
        rating: (Math.random() * 4 + 6).toFixed(1),
        year: 2020 + Math.floor(Math.random() * 5)
      }))
      
      setMovies(prev => page === 1 ? newMovies : [...prev, ...newMovies])
      setLoading(false)
      if (page > 5) setHasMore(false) // Simula fim dos resultados
    }, 800)

    return () => clearTimeout(timer)
  }, [query, page])

  return { movies, loading, hasMore }
}
