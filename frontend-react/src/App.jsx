import { BrowserRouter, Route, Routes } from "react-router-dom";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
