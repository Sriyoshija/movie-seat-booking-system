const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  movieId: mongoose.Schema.Types.ObjectId,
  category: String,
  seats: Number,
  totalPrice: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Booking", bookingSchema)
