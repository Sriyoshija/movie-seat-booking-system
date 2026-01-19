const express = require("express")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

const router = express.Router()

router.post("/signup", async (req, res) => {
  const user = await User.create(req.body)
  res.json({ message: "User created" })
})

router.post("/login", async (req, res) => {
  const user = await User.findOne(req.body)
  if (!user) return res.status(401).json({ message: "Invalid credentials" })

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  )

  res.json({ token, role: user.role })
})

module.exports = router
