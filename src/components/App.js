import '../styles/App.css'
import React, {useState} from 'react'
import MovieList from './MovieList'
import Details from './Details'
import moviesData from '../datas/movies.json'

function App() {
  const moviesList = moviesData.results
  const [movie,setMovie] = useState(moviesList[0])

/**
 * Changes the current selected movie.
 * Passed to child component (MovieList) to detect the targetted movie
 * when the user has clicked on the list.
 * @param movie - is the new selected movie.
 */
  function handleMovieChange(movie){
    setMovie(movie)
  }

  return (
    <div className="app">
      <div className="list">
        <MovieList 
          moviesList={moviesList}
          setMovie={handleMovieChange}
        />
      </div>
      <Details className="right" movie={movie}/>
    </div>
  )
}

export default App;
