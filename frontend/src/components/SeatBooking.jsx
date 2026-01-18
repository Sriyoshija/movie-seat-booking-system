import { useState } from "react"
import Payment from "./Payment"
import "./SeatBooking.css"

const SEAT_PRICES = {
REGULAR: 150,
PREMIUM: 250,
VIP: 400,
}

const seatsData = Array.from({ length: 48 }, (_, i) => ({
id: i + 1,
type:
    i < 24 ? "REGULAR" :
    i < 40 ? "PREMIUM" : "VIP",
booked: false,
}))

function SeatBooking() {
const [selectedSeats, setSelectedSeats] = useState([])
const [showPayment, setShowPayment] = useState(false)

const toggleSeat = (seat) => {
    setSelectedSeats(prev =>
    prev.find(s => s.id === seat.id)
        ? prev.filter(s => s.id !== seat.id)
        : [...prev, seat]
    )
}

const totalAmount = selectedSeats.reduce(
    (sum, seat) => sum + SEAT_PRICES[seat.type],
    0
)

  // 🔴 BOOKING CONFIRMATION AFTER PAYMENT
const confirmBooking = () => {
    const email = prompt("Enter your email for booking confirmation:")
    if (!email) return

    const bookingDetails = {
    movie: "Selected Movie",
    seats: selectedSeats.map(s => `${s.id} (${s.type})`),
    totalAmount,
    email,
    date: new Date().toLocaleString(),
    }

    localStorage.setItem("lastBooking", JSON.stringify(bookingDetails))

    alert(
    `✅ Booking Confirmed!\n\n📧 Confirmation sent to ${email}`
    )

    setSelectedSeats([])
    setShowPayment(false)
}

  // 🟢 SHOW PAYMENT PAGE
if (showPayment) {
    return (
    <Payment
        totalAmount={totalAmount}
        onPaymentSuccess={confirmBooking}
    />
    )
}
return (
    <div className="container">
    <h1>🎬 FILMHUB – Seat Selection</h1>
    <div className="legend">
        <span className="regular">Regular ₹150</span>
        <span className="premium">Premium ₹250</span>
        <span className="vip">VIP ₹400</span>
    </div>
    <div className="seats">
        {seatsData.map(seat => (
        <button
        key={seat.id}
        onClick={() => toggleSeat(seat)}
        className={`seat ${seat.type.toLowerCase()} ${
        selectedSeats.find(s => s.id === seat.id) ? "selected" : ""
        }`}
        >
        {seat.id}
        </button>
        ))}
    </div>
    <div className="summary">
        <p>
        Selected Seats:{" "}
        {selectedSeats.map(s => `${s.id}(${s.type})`).join(", ") || "None"}
        </p>
        <h3>Total Amount: ₹{totalAmount}</h3>
        <button
        className="confirm-btn"
        disabled={selectedSeats.length === 0}
        onClick={() => setShowPayment(true)}
        >
        Proceed to Payment
        </button>
    </div>
    </div>
)
}

export default SeatBooking
