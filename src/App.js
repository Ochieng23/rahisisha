import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import LandingPage from "./Components/LandingPage";
import HomePage from "./Components/HomePage";
import Profile from "./Components/Profile";
import Notifications from "./Components/Notifications";
import Admin from "./Components/Admin";
import Post from "./Components/Post";
import Community from "./Components/Community";
import SeekersList from "./Components/SeekersList"

function App() {
  // Function to check if there is an accessToken and Userrole in localStorage
  const isAuthenticated = () => {
    const accessToken = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");
    return accessToken && userRole;
  };

  // Function to check if the userRole in localStorage is "admin"
  const isAdmin = () => {
    const userRole = localStorage.getItem("userRole");
    return userRole === "ADMIN";
  };

  return (
    <div className="App">
      {!isAuthenticated() && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={isAuthenticated() ? <Profile /> : <Navigate to="/profile" />}
        />
        <Route
          path="/home"
          element={isAuthenticated() ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={
            isAuthenticated() && isAdmin() ? (
              <Admin />
            ) : (
              <Navigate to="/admin" />
            )
          }
        />
        <Route
          path="/community"
          element={
            isAuthenticated() ? <Community /> : <Navigate to="/community" />
          }
        />
        <Route
          path="/notification"
          element={
            isAuthenticated() ? (
              <Notifications />
            ) : (
              <Navigate to="/notification" />
            )
          }
        />
        <Route
          path="/manage/posts"
          element={
            isAuthenticated() ? <Post /> : <Navigate to="/manage/posts" />
          }
        />

        <Route
          path="/posts"
          element={
            isAuthenticated() ? <Post /> : <Navigate to="/posts" />
          }
        />

<Route
          path="/seekers"
          element={
            isAuthenticated() ? <SeekersList /> : <Navigate to="/seekers" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
