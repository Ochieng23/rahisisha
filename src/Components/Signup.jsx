import React, { useState } from "react";
import Footer from "./Footer";
import "./signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    category: "user",
  });
  const [user, setUser] = useState("");
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          password_confirmation: formData.passwordConfirm,
          role: formData.category.toUpperCase(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("jwt", data.jwt);
        setUser(data.user);
        window.location.href = "/login"
      } else {
        setErrors(data.errors);
      }
    } catch (error) {
      setErrors([error.message]);
    }
  };

  const handleRedirect = () => {
    window.location.href = "/login"
  }

  return (
    <>
      <div className="signup-section">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h3 style={{ color: "white" }}>Sign Up</h3>
          <div className="form-group">
            <label style={{ color: "white" }} htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label style={{ color: "white" }} htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label style={{ color: "white" }} htmlFor="password-confirm">
              Confirm password:
            </label>
            <input
              type="password"
              id="password-confirm"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label style={{ color: "white" }} htmlFor="category">
              Category:
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="user">Seeker</option>
              <option value="employer">Employer</option>
            </select>
          </div>

          <button type="submit">Sign up</button>
          <p style={{ color: "white" }}>
            Already have an account? <a onClick={handleRedirect}>Log in</a>
          </p>
          {/* Render errors below the form */}

          {/* {errors.length > 0 && (
            <ul style={{ color: "red" }}>
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          )} */}
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Signup;
