import { useEffect, useState } from "react"
import AddMovie from "./AddMovie"
import "./Movie.css"

const userRole = "ADMIN" // change to USER to test

function MovieList({ onSelectMovie }) {
const [movies, setMovies] = useState([])

useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("movies")) || []
    setMovies(saved)
}, [])

return (
    <div className="movie-container">
    <h1>🎬 FILMHUB – Movies</h1>

    {userRole === "ADMIN" && <AddMovie setMovies={setMovies} />}

    <div className="movie-grid">
        {movies.map(movie => (
        <div
        key={movie.id}
        className="movie-card"
        onClick={() => onSelectMovie(movie)}>
        <img src={movie.image} alt={movie.title} />
        <h3>{movie.title}</h3>
        <p>{movie.duration}</p>
        <p>{movie.description}</p>
        </div>
        ))}<br />
    </div>
    </div>
)
}

export default MovieList
