const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const seats = [];

function initSeats() {
  seats.length = 0;
  for (let row = 1; row <= 5; row++) {
    for (let seat = 1; seat <= 10; seat++) {
      seats.push({ row, seat, booked: false });
    }
  }
}

initSeats();

// AUTH MIDDLEWARE
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No token" });

  try {
    const token = header.split(" ")[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

// GET SEATS
router.get("/seats", (req, res) => {
  res.json(seats);
});

// BOOK SEAT (USER)
router.post("/book", auth, (req, res) => {
  const { row, seat } = req.body;

  const s = seats.find(x => x.row === row && x.seat === seat);
  if (!s) return res.status(404).json({ message: "Seat not found" });
  if (s.booked)
    return res.status(400).json({ message: "Seat already booked" });

  s.booked = true;
  res.json({ message: "Seat booked successfully" });
});

// RESET ALL SEATS (ADMIN)
router.post("/admin/reset", auth, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  initSeats();
  res.json({ message: "All seats reset by admin" });
});

module.exports = router;
