import { useEffect, useState } from "react";

const API_BASE_URL =
  "https://movie-seat-booking-system.onrender.com/api";

function Seats() {
  const [seats, setSeats] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch seats on load
  useEffect(() => {
    fetch(`${API_BASE_URL}/bookings/seats`)
      .then(res => res.json())
      .then(data => setSeats(data))
      .catch(err => console.error("Failed to load seats:", err));
  }, []);

  // Book seat (AUTH REQUIRED)
  const bookSeat = async (row, seat) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login to book seats");
      return;
    }

    try {
      const res = await fetch(
        `${API_BASE_URL}/bookings/book`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ row, seat })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Booking failed");
        return;
      }

      setMessage(data.message);

      // Update seat state locally (mark as booked)
      setSeats(prev =>
        prev.map(s =>
          s.row === row && s.seat === seat
            ? { ...s, booked: true }
            : s
        )
      );
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🎬 Seat Booking</h2>

      {message && <p>{message}</p>}

      <div style={{ maxWidth: "600px" }}>
        {seats.map((s, index) => (
          <button
            key={index}
            disabled={s.booked}
            onClick={() => bookSeat(s.row, s.seat)}
            style={{
              margin: "5px",
              padding: "10px",
              minWidth: "70px",
              backgroundColor: s.booked ? "#999" : "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: s.booked ? "not-allowed" : "pointer"
            }}
          >
            R{s.row}-S{s.seat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Seats;
