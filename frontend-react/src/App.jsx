import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./Admin";
import AdminRoute from "./AdminRoute";
import Login from "./Login";
import Navbar from "./Navbar";
import RequireAuth from "./RequireAuth";
import Seats from "./Seats";
import Signup from "./Signup";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Seats />
            </RequireAuth>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
