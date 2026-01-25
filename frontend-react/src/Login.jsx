import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL =
  "https://movie-seat-booking-system.onrender.com/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    console.log("LOGIN RESPONSE:", data); // DEBUG LINE

    if (!res.ok) {
      alert(data.message);
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role); // 🔴 CRITICAL

    navigate("/");
  };

  return (
    <div>
      <h2>Login</h2>

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

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
