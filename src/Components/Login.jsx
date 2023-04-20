import React, { useState, useEffect } from "react";
import Footer from "./Footer";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    if (storedAccessToken && storedAccessToken !== "undefined") {
      setAccessToken(storedAccessToken);
    }
  }, []);

  const handleLogin = () => {
    try {
      const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
      const userRole = decodedToken.role;
      localStorage.setItem("userRole", userRole);
      if (userRole === "USER") {
        window.location.href = "/home";
      } else if (userRole === "Employer") {
        window.location.href = "/profile";
      }
    } catch (error) {
      setErrors([error.message]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:3000/generate-token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.accessToken;

        console.log(data)
        localStorage.setItem("accessToken", accessToken);
        setAccessToken(accessToken);
      } else {
        const data = await response.json();
        setErrors(data.errors);
      }
    } catch (error) {
      setErrors([error.message]);
    }
  };

  const handleSignupClick = () => {
    window.location.href = "/signup";
  };

  useEffect(() => {
    if (accessToken) {
      handleLogin();
    }
  }, [accessToken]);


  return (
    <>
      <div
        style={{ color: "white", minHeight: "100vh" }}
        className="d-flex align-items-center"
      >
        {/* Render login form */}
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div
                className="login-form-container border rounded p-3"
                style={{ backgroundColor: "black" }}
              >
                <div className="login-form-header">
                  <h2>Log in</h2>
                </div>

                <div className="login-form-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">
                        Username:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password:
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Log in
                    </button>

                    <div className="signup-link-container mt-3">
                      <p>Don't have an account?</p>
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={handleSignupClick}
                      >
                        Sign up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* ... */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
