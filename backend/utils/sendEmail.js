const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

module.exports = async (to, booking, movie) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "🎬 Movie Booking Confirmation",
    html: `
      <h3>Booking Confirmed</h3>
      <p>Movie: ${movie.title}</p>
      <p>Category: ${booking.category}</p>
      <p>Seats: ${booking.seats}</p>
      <p>Total: ₹${booking.totalPrice}</p>
    `
  })
}
