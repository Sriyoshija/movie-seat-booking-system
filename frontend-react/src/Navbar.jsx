import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  console.log("NAVBAR ROLE:", role); // DEBUG

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Seats</Link>

      {role === "admin" && (
        <>
          {" | "}
          <Link to="/admin">Admin</Link>
        </>
      )}

      {!token && <> | <Link to="/login">Login</Link></>}
      {!token && <> | <Link to="/signup">Signup</Link></>}
      {token && <> | <button onClick={logout}>Logout</button></>}
    </nav>
  );
}

export default Navbar;
