import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./components/SignupPage";
import ProfileEdit from "./components/ProfileEdit";
import Profile from "./components/Profile";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { RequireAuth } from "./components/RequireAuth";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);
function App() {
  return (
    <div className="App">
      <Authenticator.Provider>
        <Router>
          <Routes>
            <Route path="/" element={<SignupPage />} />
            <Route
              path="/profile-edit"
              element={
                <RequireAuth>
                  <ProfileEdit />
                </RequireAuth>
              }
            />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </Authenticator.Provider>
    </div>
  );
}

export default App;
