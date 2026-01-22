const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Movie Seat Booking Backend is running 🚀");
});

// CONNECT TO MONGODB FIRST
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    // ROUTES
    app.use("/api/auth", authRoutes);
    app.use("/api/bookings", bookingRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("MongoDB connection failed:", err);
  });
