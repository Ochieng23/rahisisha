import { React, useEffect, useState } from "react";


const SeekersList = () => {
  const [seeker, setSeeker] = useState([])
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(()=> {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken) {
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
        .catch((error) => console.log(error));
    } else {
      setAuthenticated(false);
    }
  }, [])

  return (
    <>
      <section className="seekers__lists-page">
        <div className="seeker__lists-container">
          {
            seeker.map((seek)=> {
              <article className="community__card-list">
                <div className="community__card-avatar">
                    <img src={seek.avatar} alt="" />
                </div>
                <div className="comunity__card-info">
                    <h5>J{seek.full_name}</h5>
                    <strong>{seek.email}</strong>
                    <strong>{seek.phone_number}</strong>
                    <strong>{seek.location}</strong>
                </div>
                <div className="community__card-button">
                    <strong>Preferred job: {seek.preferred_job}</strong>
                    <strong>Availability: {seek.availability}</strong>
                </div>
              </article>
            })
          }
        </div>
      </section>
    </>
  );
};

export default SeekersList;
