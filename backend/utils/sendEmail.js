const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

const sendEmail = async (to, booking, movie) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "🎬 Movie Seat Booking Confirmation",
    html: `
      <h2>Booking Confirmed!</h2>
      <p><b>Movie:</b> ${movie.title}</p>
      <p><b>Show Time:</b> ${movie.showTime}</p>
      <p><b>Category:</b> ${booking.category}</p>
      <p><b>Seats:</b> ${booking.seats}</p>
      <p><b>Total Amount:</b> ₹${booking.totalPrice}</p>
      <br/>
      <p>Enjoy your movie 🍿</p>
    `
  })
}

module.exports = sendEmail
