import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      {/* Navigation bar */}
      <nav className="navbar bg-light px-3 mb-4">
        <Link to="/" className="navbar-brand fw-bold">
          Job Board
        </Link>
        <div>
          <Link to="/login" className="btn btn-outline-primary me-2">
            Login
          </Link>
          <Link to="/signup" className="btn btn-outline-success">
            Signup
          </Link>
        </div>
      </nav>

      {/* Page routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
