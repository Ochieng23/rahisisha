import { useEffect, useState } from "react";
import "./seeker.css";
import Navigation from "./Navigation";
import Navbar from "../Components/Main Page/Navbar";

const Seeker = () => {
  const [seeker, setSeeker] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const [, payloadBase64] = accessToken?.split(".") ?? [];
    const payload = JSON.parse(atob(payloadBase64));
    const userRole = payload?.role;

    if (accessToken && userRole === "employer") {
      setAuthenticated(true);
      fetch("http://127.0.0.1:3000/seekers", {
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
        .then((data) => setSeeker(data))
        .catch((error) => console.error(error));
    } else {
      setAuthenticated(false);
    }
  }, []);

  return (
    <>
      <Navbar />
      <section className="seekers__lists-page" style={{marginTop:"50px"}}>
        <div className="seeker__lists-container">
          {seeker.map((seek) => (
            <article key={seek.id} className="community__card-list">
              <div className="community__card-avatar">
                <img src={seek.avatar} alt="" />
              </div>
              <div className="comunity__card-info">
                <h5>{seek.full_name}</h5>
                <strong>{seek.email}</strong>
                <strong>{seek.phone_number}</strong>
                <strong>{seek.location}</strong>
              </div>
              <div className="community__card-button">
                <strong>Preferred job: {seek.preferred_job}</strong>
                <strong>Availability: {seek.availability}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Seeker;
