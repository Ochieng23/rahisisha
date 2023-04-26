import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";

const Employerprofile = () => {
    const [employer, setEmployer] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
  
    useEffect(() => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        setAuthenticated(true);
        const [, payloadBase64] = accessToken.split(".");
        const payload = JSON.parse(atob(payloadBase64));
        const userId = payload.user_ref;
  
        fetch(`http://127.0.0.1:3000/employers/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error("Network response was not ok");
            }
          })
          .then((data) => setEmployer(data))
          .catch((error) => console.log(error));
      } else {
        setAuthenticated(false);
      }
    }, []);
  
    if (!authenticated) {
      return <div>You are not authenticated</div>;
    }
  
    if (!employer) {
      return <div>Loading...</div>;
    }
  
    return (
      <>
      <Navigation/>
      <div>
        <h1>{employer.company_name}</h1>
        <img src={employer.avatar} alt="Company logo" />
        <p>{employer.description}</p>
        <p>Location: {employer.location}</p>
        <p>Email: {employer.email}</p>
        <p>Verified: {employer.verified ? "Yes" : "No"}</p>
      </div>
      </>
    );
}

export default Employerprofile