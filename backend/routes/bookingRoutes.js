const express = require("express");
const router = express.Router();

/*
  TEMP in-memory seat data
  (For college project this is perfectly OK)
*/
const seats = [];

for (let row = 1; row <= 5; row++) {
  for (let seat = 1; seat <= 10; seat++) {
    seats.push({
      row,
      seat,
      booked: false
    });
  }
}

/*
  GET all seats
  URL: /api/bookings/seats
*/
router.get("/seats", (req, res) => {
  res.json(seats);
});

/*
  BOOK a seat
  URL: /api/bookings/book
  Body: { "row": 1, "seat": 2 }
*/
router.post("/book", (req, res) => {
  const { row, seat } = req.body;

  const seatObj = seats.find(
    s => s.row === row && s.seat === seat
  );

  if (!seatObj) {
    return res.status(404).json({ message: "Seat not found" });
  }

  if (seatObj.booked) {
    return res.status(400).json({ message: "Seat already booked" });
  }

  seatObj.booked = true;

  res.json({ message: "Seat booked successfully" });
});

/*
  CANCEL booking
  URL: /api/bookings/cancel
*/
router.post("/cancel", (req, res) => {
  const { row, seat } = req.body;

  const seatObj = seats.find(
    s => s.row === row && s.seat === seat
  );

  if (!seatObj) {
    return res.status(404).json({ message: "Seat not found" });
  }

  seatObj.booked = false;

  res.json({ message: "Booking cancelled" });
});

module.exports = router;
