import '../styles/SearchBar.css'

function SearchBar({setFilter}) {
  /**
   * Detects change from the input
   * and notifies parent component (MovieList) that the filter has changed.
   * @param e - is the event where the input ('filter' value) has changed. 
   */
  function handleChange(e){
    const value = e.target.value
    setFilter(value)
  }

  return (
    <div className="search">
      <button className="search-button" disabled>🔎</button>
      <input className="search-bar" placeholder="Movie name" onChange={handleChange}></input>
    </div>
  )
}

export default SearchBar
