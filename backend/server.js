require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const Movie = require("./models/movie")
const Booking = require("./models/booking")

const app = express()
app.use(cors())
app.use(express.json())

// ✅ CONNECT DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("FILMHUB Backend Running")
})

/* ========= MOVIE ROUTES ========= */

// GET movies
app.get("/movies", async (req, res) => {
  const movies = await Movie.find()
  res.json(movies)
})

// ADD movie (ADMIN)
app.post("/movies", async (req, res) => {
  const movie = new Movie(req.body)
  await movie.save()
  res.json({ message: "Movie added" })
})

/* ========= BOOKING ROUTES ========= */

// SAVE booking
app.post("/bookings", async (req, res) => {
  const booking = new Booking(req.body)
  await booking.save()
  res.json({ message: "Booking saved" })
})

const PORT = 5000
app.listen(PORT, () =>
  console.log("Server running on port 5000")
)
