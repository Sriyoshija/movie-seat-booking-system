import { useState } from "react"
import AddMovie from "./components/AddMovie"
import Header from "./components/Header"
import Login from "./components/Login"
import MovieList from "./components/MovieList"
import SeatBooking from "./components/SeatBooking"
import Signup from "./components/Signup"

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("session"))
  )
  const [showSignup, setShowSignup] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)

  const login = (userData) => {
    localStorage.setItem("session", JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("session")
    setUser(null)
    setSelectedMovie(null)
  }

  // 🔐 LOGIN / SIGNUP
  if (!user) {
    return showSignup ? (
      <Signup onSignup={() => setShowSignup(false)} />
    ) : (
      <div>
        <Login onLogin={login} />
        <p
          style={{ cursor: "pointer", textAlign: "center" }}
          onClick={() => setShowSignup(true)}
        >
          New user? Sign up
        </p>
      </div>
    )
  }

  // 🎟️ SEAT BOOKING
  if (selectedMovie) {
    return (
      <>
        <Header user={user} onLogout={logout} />
        <SeatBooking movie={selectedMovie} />
      </>
    )
  }
  // 🎬 MOVIE LIST
  return (
    <>
      <Header user={user} onLogout={logout} />
      {user?.role === "ADMIN" && (
        <AddMovie onMovieAdded={() => window.location.reload()} />
      )}
      <MovieList onSelectMovie={setSelectedMovie} />
    </>
  )
}

export default App