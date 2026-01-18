const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
  title: String,
  showTime: String,
  seatCategories: {
    silver: {
      price: { type: Number, default: 150 },
      totalSeats: { type: Number, default: 50 },
      availableSeats: { type: Number, default: 50 }
    },
    gold: {
      price: { type: Number, default: 250 },
      totalSeats: { type: Number, default: 40 },
      availableSeats: { type: Number, default: 40 }
    },
    recliner: {
      price: { type: Number, default: 400 },
      totalSeats: { type: Number, default: 20 },
      availableSeats: { type: Number, default: 20 }
    }
  }
})

module.exports = mongoose.model("Movie", movieSchema)
