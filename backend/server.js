const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const bookingRoutes = require("./routes/bookingRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// AUTH ROUTES (LOGIN / SIGNUP)
app.use("/api/auth", authRoutes);

// SEAT BOOKING ROUTES
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
