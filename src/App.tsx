import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./components/SignupPage";
import ProfileEdit from "./components/ProfileEdit";
import { Authenticator } from "@aws-amplify/ui-react";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route
            path="/profile-edit"
            element={
              <Authenticator>
                <ProfileEdit />
              </Authenticator>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
