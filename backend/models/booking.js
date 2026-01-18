const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  movieId: mongoose.Schema.Types.ObjectId,
  category: String,
  seats: Number,
  totalPrice: Number,
  status: {
    type: String,
    enum: ["CONFIRMED"],
    default: "CONFIRMED"
  }
})

module.exports = mongoose.model("Booking", bookingSchema)
