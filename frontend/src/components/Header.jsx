
function Header({ user, onLogout }) {
return (
    <div className="header">
    <h1>🎬 FILMHUB</h1>
    <div>
        <span>{user.username} ({user.role})</span>
        <button onClick={onLogout}>Logout</button>
    </div>
    </div>
)
}

export default Header
