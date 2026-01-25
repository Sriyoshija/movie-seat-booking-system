import { useState } from "react";

const API_BASE_URL =
  "https://movie-seat-booking-system.onrender.com/api";

function Admin() {
  const [message, setMessage] = useState("");

  const resetSeats = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${API_BASE_URL}/bookings/admin/reset`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      <button
        onClick={resetSeats}
        style={{
          padding: "10px",
          background: "black",
          color: "white"
        }}
      >
        Reset All Seats
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Admin;
