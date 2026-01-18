const express = require("express")
const Movie = require("../models/movie")
const auth = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/add", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admin only" })

  const movie = await Movie.create(req.body)
  res.json(movie)
})

router.get("/", async (req, res) => {
  const movies = await Movie.find()
  res.json(movies)
})

module.exports = router
