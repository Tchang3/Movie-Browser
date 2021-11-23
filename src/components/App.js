import '../styles/App.css'
import React, {useState,useEffect} from 'react'
import MovieList from './MovieList'
import Details from './Details'
import moviesJson from '../datas/movies.json' // used if API doesn't work anymore

function App() {
  const [initialMoviesData,setInitialMoviesData] = useState(moviesJson)
  const [moviesList,setMoviesList] = useState(initialMoviesData.results)
  const [movie,setMovie] = useState(moviesList[0])
  const [connected,setConnected] = useState(false)

  /**
   * Calls the TMDB api to fetch movies. 
   * Upon success, 'connected' is set to true, which changes the component's functions behavior.
   * Else, nothing is done and the component continues to work with the json file.
   */
  async function fetchMovies(){
    fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=cf36f9aeb147ea6ae7b074ced171ef64')
    .then(data=>data.json())
    .then(data=>{
      if(data.results){
        setInitialMoviesData(data)
        setMoviesList(data.results)
        setMovie(data.results[0])
        setConnected(true)
      }
    })
  }

  /**
   * ComponentDidMount equivalent. Call to fetch movies from TMDB api once. 
   */
  useEffect(()=>{
    fetchMovies()
  },[])

  /**
   * Changes the list of movies of component MovieList only if connection
   * to TMDB api is successful. Uses the TMDB's search engine instead.
   * @param terms - is for the user's input on search bar.
   */
  async function searchMovie(terms){
    var replaced = terms.replace(/\s/g, '+');
    fetch('https://api.themoviedb.org/3/search/movie?api_key=cf36f9aeb147ea6ae7b074ced171ef64&query='+replaced)
    .then(data=>data.json())
    .then(data=>{
      setMoviesList(data.results)
      if(data.results[0]!==undefined){
        setMovie(data.results[0])
      }
    })
  }

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
   * to modify the movies shown in list.
   * If connected, uses the TMDB api to query movies corresponding to the filter.
   * If not, filters on already existing movies' name.
   * @param filter - is the value (or values) to search movies with similar names.
   */
  function rebuildMovieList(filter){
    if(filter!==""){
      if(connected){
        searchMovie(filter)
      } else {
        setMoviesList(initialMoviesData.results.filter(res => res.title.toLowerCase().includes(filter.toLowerCase())))
      }
    } else {
      setMoviesList(initialMoviesData.results)
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
