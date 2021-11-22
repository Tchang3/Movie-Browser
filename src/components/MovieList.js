import '../styles/MovieList.css'
import moviesData from '../datas/movies.json'

function MovieList() {
  const moviesList = moviesData.results
  return (
    <ul className="movie-list">
    {
        moviesList.map((movie)=>(
            <li className="movie-element">
                <span className="movie-title">{movie.title}</span>
            </li>
        ))
    }
    </ul>
  )
}

export default MovieList