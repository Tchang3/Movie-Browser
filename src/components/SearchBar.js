import '../styles/SearchBar.css'

function SearchBar() {
  
  return (
    <div className="search">
      <button className="search-button">🔎</button>
      <input className="search-bar" placeholder="Movie name"></input>
    </div>
  )
}

export default SearchBar
