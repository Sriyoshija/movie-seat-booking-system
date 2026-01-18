import { useState } from "react"

function Signup({ onSignup }) {
const [user, setUser] = useState({
    username: "",
    password: "",
    role: "USER",
})

const handleSignup = () => {
    if (!user.username || !user.password) {
    alert("Fill all fields")
    return
    }
    localStorage.setItem("user", JSON.stringify(user))
    alert("Signup successful ✅")
    onSignup()
}

return (
    <div className="auth-box">
    <h2>🎬 FILMHUB – Sign Up</h2>

    <input
        placeholder="Username"
        onChange={e => setUser({ ...user, username: e.target.value })}
    />
    <input
        type="password"
        placeholder="Password"
        onChange={e => setUser({ ...user, password: e.target.value })}
    />

    <select
        onChange={e => setUser({ ...user, role: e.target.value })}
    >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
    </select>

    <button onClick={handleSignup}>Sign Up</button>
    </div>
)
}

export default Signup
