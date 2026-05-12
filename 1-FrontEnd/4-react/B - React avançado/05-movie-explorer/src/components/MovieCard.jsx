import { memo } from 'react'

const MovieCard = memo(({ movie, innerRef, onClick }) => {
  return (
    <div 
      ref={innerRef} 
      className="movie-card"
      onClick={() => onClick(movie)}
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
})

export default MovieCard
