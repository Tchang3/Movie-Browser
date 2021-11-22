import '../styles/App.css'
import Details from './Details'
import MovieList from './MovieList'
import SearchBar from './SearchBar'

function App() {
  return (
    <div>
      <SearchBar />
      <MovieList />
      <Details />
    </div>
  )
}

export default App;
