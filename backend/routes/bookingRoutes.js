const express = require("express")
const Booking = require("../models/booking")
const Movie = require("../models/movie")
const User = require("../models/user")
const auth = require("../middleware/authMiddleware")
const sendEmail = require("../utils/sendEmail")

// ✅ THIS LINE WAS MISSING
const router = express.Router()

router.post("/book", auth, async (req, res) => {
  try {
    const { movieId, category, seats } = req.body

    const movie = await Movie.findById(movieId)
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" })
    }

    if (movie.seatCategories[category].availableSeats < seats) {
      return res.status(400).json({ message: "Not enough seats" })
    }

    // Lock seats
    movie.seatCategories[category].availableSeats -= seats
    await movie.save()

    const totalPrice =
      movie.seatCategories[category].price * seats

    const booking = await Booking.create({
      userId: req.user.id,
      movieId,
      category,
      seats,
      totalPrice
    })

    const user = await User.findById(req.user.id)

    // username = email in your project
    await sendEmail(user.username, booking, movie)

    res.json({
      message: "Booking confirmed & email sent",
      booking
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
