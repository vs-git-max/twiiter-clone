import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage.jsx";
import LogInPage from "./pages/auth/login/LogInPage.jsx";
import SignUpPage from "./pages/auth/signup/SignUpPage.jsx";

const App = () => {
  return (
    <div className="flex max-w-6xl mx-auto">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
};

export default App;
