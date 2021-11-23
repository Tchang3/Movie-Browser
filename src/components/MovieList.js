import '../styles/MovieList.css'
import React, {useState} from 'react'

function MovieList({moviesList,setMovie}) {
  const [retract,setRetract] = useState("movie hidden")
  const [retractText,setRetractText] = useState(">")

/**
 * Notifies the parent component (App) that a movie has been clicked on 
 * by calling the function that was passed as this component's prop 'setMovie'
 * @param movie - is the target movie of the click event.
 */
  function handleClickMovie(movie){
    console.log(movie.title)
    setMovie(movie)
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

  return (
    <div className={retract}>
        <ul className="movie-list">
          <li className="movie-list-head">List of movies</li>
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