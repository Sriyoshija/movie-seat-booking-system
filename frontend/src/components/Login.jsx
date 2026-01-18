import { useState } from "react"

function Login({ onLogin }) {
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")

const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem("user"))

    if (
    savedUser &&
    savedUser.username === username &&
    savedUser.password === password
    ) {
    alert("Login successful")
    onLogin(savedUser)
    } else {
    alert("Invalid credentials")
    }
}

return (
    <div className="auth-box">
    <h2>🎬 FILMHUB – Login</h2>

    <input
        placeholder="Username"
        onChange={e => setUsername(e.target.value)}
    />
    <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
    />
    <button onClick={handleLogin}>Login</button>
    </div>
)
}

export default Login
