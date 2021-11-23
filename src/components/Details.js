import '../styles/Details.css'

function Details({movie}) {
  const imgBasePath = "https://image.tmdb.org/t/p/original";
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
                    <span className="detail-subtitle">Original title: {movie.original_title}</span>
                </h1>
                <p className="detail-attributes">
                    <span className="detail-attribute"> Release date: {movie.release_date} </span>
                    <span className="detail-attribute"> Popularity: {movie.popularity}%</span>
                    <span className="detail-attribute"> Ratings: {movie.vote_average}⭐ ({movie.vote_count} votes) </span>
                    <span className="detail-attribute"> Language: {movie.original_language} </span>
                </p>
                <span className="detail-attribute"> Genres: </span>
                <ul className="detail-genre-list">
                    {
                        movie.genre_ids.map((value)=>(
                            <li key={value} className="detail-genre">{value}</li>
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
