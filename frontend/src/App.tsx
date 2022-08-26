import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Link to="/">Main</Link> | <Link to="/login">Login</Link> |{" "}
          <Link to="/home">Home</Link> */}
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/nav" element={} /> */}
          {/* <Route
            path="/home"
            element={
              // <PrivateRoute>
              // <Main />
              // </PrivateRoute>
            }
          /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
