const express = require("express")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

const router = express.Router()

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.create({
      username,
      password
    })

    res.json({ message: "User created", user })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username, password })
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    )

    res.json({ token, role: user.role })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
