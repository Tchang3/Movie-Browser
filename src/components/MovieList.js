import '../styles/MovieList.css'
import React, {useState} from 'react'
import SearchBar from './SearchBar'

function MovieList({moviesList,setMovie,setFilter}) {
  const [retract,setRetract] = useState("movie hidden")
  const [retractText,setRetractText] = useState(">")

  /**
   * Notifies the parent component (App) that a movie has been clicked on 
   * by calling the function that was passed as this component's prop 'setMovie'
   * @param movie - is the target movie of the click event.
   */
  function handleClickMovie(movie){
    setMovie(movie)
  }

  /**
   * Notifies the parent component (App) that the value of 'filter' from child component (SearchBar)
   * has changed by calling the function that was passed as this component's prop 'setFilter'
   * @param filter - is the new filter for movie name.
   */
  function handleNewFilter(filter){
    setFilter(filter)
  }


  /**
   * Retracts the list for better visibility on movie details
   * by modifying the list's class (retract) and the button's name (retractText).
   */
  function handleClickRetract(){
    if(retract === "movie"){
      setRetract("movie hidden")
      setRetractText(">")
    } else {
      setRetract("movie")
      setRetractText("<")
    }
  }

  /**
   * Check if parent component passed an empty list or not.
   * If empty, then show that no movie matched the filter,
   * else show default value "List of movies".
   * @returns string
   */
  function detectNoMatch(){
    if(moviesList.length === 0){
      return "No result"
    } else {
      return "List of movies"
    }
  }

  return (
    <div className={retract}>
        <ul className="movie-list">
          <li className="movie-list-head"><SearchBar setFilter={handleNewFilter}/></li>
          <li className="movie-list-head">{detectNoMatch()}</li>
          {
              moviesList.map((movie)=>(
                  <li key={movie.id} className="movie-element" onClick={()=>handleClickMovie(movie)}>
                      <span className="movie-title">{movie.title}</span>
                  </li>
              ))
          }
      </ul>
      <button className="retract-button" onClick={handleClickRetract}>{retractText}</button>
    </div>
  )
}

export default MovieList