const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
  movieId: String,
  movieTitle: String,
  userEmail: String,
  seats: [String],
  seatType: String,
  totalPrice: Number,
  bookingDate: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Booking", bookingSchema)
