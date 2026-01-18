import { useState } from "react"

function AddMovie({ setMovies, onMovieAdded }) {
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    duration: "",
    image: "",
  })

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value })
  }

  const addMovie = (e) => {
    e?.preventDefault()
    if (!movie.title || !movie.image) {
      alert("Title and image are required")
      return
    }

    const movies = JSON.parse(localStorage.getItem("movies")) || []
    const newMovie = { id: Date.now(), ...movie }
    const updated = [...movies, newMovie]
    localStorage.setItem("movies", JSON.stringify(updated))

    setMovie({ title: "", description: "", duration: "", image: "" })

    if (typeof setMovies === "function") setMovies(updated)
    if (typeof onMovieAdded === "function") onMovieAdded()
    if (!setMovies && !onMovieAdded) window.location.reload()
  }

  return (
    <form className="add-movie" onSubmit={addMovie}>
      <h3>Add Movie</h3>
      <input
        name="title"
        placeholder="Title"
        value={movie.title}
        onChange={handleChange}
      />
      <input
        name="image"
        placeholder="Image URL"
        value={movie.image}
        onChange={handleChange}
      />
      <input
        name="duration"
        placeholder="Duration"
        value={movie.duration}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={movie.description}
        onChange={handleChange}
      />
      <button type="submit">Add Movie</button>
    </form>
  )
}

export default AddMovie
