import React, { useState,useEffect } from 'react';
import '../styles/Details.css'

function Details({movie}) {
  const imgBasePath = "https://image.tmdb.org/t/p/original";
  const [genreList,setGenreList] = useState([])
  const [connected,setConnected] = useState(false)

  /**
   * Calls the TMDB api to get the name of the genre by ID.
   * If success, component will use the genre's name instead of ID.
   */
  async function getGenres(){
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=cf36f9aeb147ea6ae7b074ced171ef64')
    .then(data=>data.json())
    .then(data=>{
        if(data.genres){
            setGenreList(data.genres)
            setConnected(true)
        }
    })
  }
  
  /**
   * Calls getGenres upon mount
   */
  useEffect(()=>{
    getGenres()
  },[])

  /**
   * Converts genre ID to genre name.
   * @param value - is for the movie's genre value
   * @returns string (name) || int (value)
   */
  function convertValueToGenre(value){
      if(connected){
          const found = genreList.find(a => a.id === value)
          if(found){
            return found.name
          } else {
            return value
          }
      } else {
          return value
      }
  }

  return (
    <div className="detail-box">
        <div className="detail-top">
            <div className="detail-left">
                <img src={imgBasePath+movie.poster_path} className="detail-poster" alt={movie.title}/>
            </div>

            <div className="detail-right">
                <h1 className="detail-title">
                    {movie.title}
                    <br/>
                    <span className="detail-subtitle">Original title: {movie.original_title}{movie.adult ? <span>🔞</span>:null}</span>
                </h1>
                <p className="detail-attributes">
                    <span className="detail-attribute"> Release date: {movie.release_date} </span>
                    <span className="detail-attribute"> Popularity: {movie.popularity}</span>
                    <span className="detail-attribute"> Ratings: {movie.vote_average}⭐ ({movie.vote_count} votes) </span>
                    <span className="detail-attribute"> Language: {movie.original_language} </span>
                </p>
                <span className="detail-attribute"> Genres: </span>
                <ul className="detail-genre-list">
                    {
                        movie.genre_ids.map((value)=>(
                            <li key={value} className="detail-genre">{convertValueToGenre(value)}</li>
                        ))
                    }
                </ul>
            </div>
        </div>

        <div className="detail-bottom">
            <h2 className="detail-subtitle">Overview</h2>
            <hr />
            <p className="detail-overview">{movie.overview}</p>
            <img src={imgBasePath+movie.backdrop_path} className="detail-backdrop" alt={movie.title}/>
        </div>
    </div>
  )
}

export default Details
