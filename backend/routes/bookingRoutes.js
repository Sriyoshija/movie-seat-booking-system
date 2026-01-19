const express = require("express")
const Booking = require("../models/booking")
const Movie = require("../models/movie")
const User = require("../models/user")
const auth = require("../middleware/authMiddleware")
const sendEmail = require("../utils/sendEmail")

const router = express.Router()

router.post("/book", auth, async (req, res) => {
  const { movieId, category, seats } = req.body

  const movie = await Movie.findById(movieId)
  if (movie.seatCategories[category].availableSeats < seats) {
    return res.status(400).json({ message: "Not enough seats" })
  }

  movie.seatCategories[category].availableSeats -= seats
  await movie.save()

  const totalPrice = movie.seatCategories[category].price * seats

  const booking = await Booking.create({
    userId: req.user.id,
    movieId,
    category,
    seats,
    totalPrice
  })

  const user = await User.findById(req.user.id)
  await sendEmail(user.username, booking, movie)

  res.json({ message: "Booking confirmed & email sent" })
})

module.exports = router
