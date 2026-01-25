import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ marginBottom: "20px" }}>
      <Link to="/">Seats</Link> |{" "}
      {!token && <Link to="/login">Login</Link>} |{" "}
      {!token && <Link to="/signup">Signup</Link>}
      {token && (
        <>
          {" | "}
          <button
            onClick={handleLogout}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
