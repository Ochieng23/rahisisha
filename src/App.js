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
import SeekersList from "./Components/SeekersList";
import JobForm from "./Components/JobForm";
import Employerprofile from "./Components/Employerprofile";
import Jobs from "./Components/Jobs";
import Employerform from "./Components/Employerform";
import Seeker from "./Components/Seeker";

// new UI
import Landing from "./Components/Main Page/Landing";
import Login from './Components/LoginPage/Login'
import Maincontent from './Components/Main Page/Maincontent'

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

        {/* New UI */}
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Maincontent />} />
        <Route path="/landing" element={<Landing />} />
        {/* New UI */}

        {/* <Route path="/employer" element={<Employerprofile />} /> */}
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
          path="/manage/posts"
          element={
            isAuthenticated() ? <Post /> : <Navigate to="/manage/posts" />
          }
        />

        <Route
          path="/posts"
          element={isAuthenticated() ? <Post /> : <Navigate to="/posts" />}
        />
        <Route
          path="/jobform"
          element={isAuthenticated() ? <JobForm /> : <Navigate to="/jobform" />}
        />

        <Route
          path="/seekers"
          element={
            isAuthenticated() ? <SeekersList /> : <Navigate to="/seekers" />
          }
        />
        <Route
          path="/employer"
          element={
            isAuthenticated() ? (
              <Employerprofile />
            ) : (
              <Navigate to="/employer" />
            )
          }
        />

        <Route
          path="/employerform"
          element={
            isAuthenticated() ? (
              <Employerform />
            ) : (
              <Navigate to="/employerform" />
            )
          }
        />
        <Route
          path="/jobform"
          element={isAuthenticated() ? <JobForm /> : <Navigate to="/jobform" />}
        />

        <Route
          path="/jobs"
          element={isAuthenticated() ? <Jobs /> : <Navigate to="/jobs" />}
        />

        <Route
          path="/talent"
          element={
            isAuthenticated() ? <Seeker /> : <Navigate to="/talent" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
