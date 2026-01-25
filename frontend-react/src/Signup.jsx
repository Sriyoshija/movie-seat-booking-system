import { useState } from "react";

const API_BASE_URL =
  "https://movie-seat-booking-system.onrender.com/api";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Signup failed");
        return;
      }

      setMessage("Signup successful 🎉 Please login");
    } catch {
      setMessage("Server error");
    }
  };

  return (
    <div>
      <h2>Signup</h2>

      <input
        placeholder="Email"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br />

      <button onClick={handleSignup}>Signup</button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Signup;
