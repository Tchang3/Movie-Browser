import '../styles/App.css'
import React, {useState,useEffect} from 'react'
import MovieList from './MovieList'
import Details from './Details'
import moviesJson from '../datas/movies.json' // default if API doesn't work

function App() {
  const [moviesData,setMoviesData] = useState(moviesJson)
  const [moviesList,setMoviesList] = useState(moviesData.results)
  const [movie,setMovie] = useState(moviesList[0])

  async function fetchMovies(){
    fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=cf36f9aeb147ea6ae7b074ced171ef64')
    .then(data=>data.json())
    .then(data=>{
      setMoviesData(data)
      setMoviesList(data.results)
      setMovie(data.results[0])
    })
  }

  useEffect(()=>{
    fetchMovies()
  },[])

  

  /**
   * Changes the current selected movie.
   * Passed to child component (MovieList) to detect the targetted movie
   * when the user has clicked on the list.
   * @param movie - is the new selected movie.
   */
  function handleMovieChange(movie){
    setMovie(movie)
  }

  /**
   * Handling change on filter.
   * @param filter - is the new filter for movie name.
   */
    function handleFilterChange(filter){
    rebuildMovieList(filter)
  }

  /**
   * Changes the array moviesList passed to MovieList component in order 
   * to modify the movies shown in list. Show everything if filter is empty.
   * @param filter - is the new filter for movie name.
   */
  function rebuildMovieList(filter){
    if(filter!==""){
      setMoviesList(moviesData.results.filter(res => res.title.toLowerCase().includes(filter.toLowerCase())))
    } else {
      setMoviesList(moviesData.results)
    }
  }

  return (
    <div className="app">
      <div className="list">
        <MovieList 
          moviesList={moviesList}
          setMovie={handleMovieChange}
          setFilter={handleFilterChange}
        />
      </div>
      <Details className="right" movie={movie}/>
    </div>
  )
}

export default App;
