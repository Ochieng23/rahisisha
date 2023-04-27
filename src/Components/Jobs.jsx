import React, { useEffect, useState } from 'react';
import './job.css';
import Navigation from './Navigation';

const Jobs = () => {
  const [job, setJob] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      setAuthenticated(true);
      fetch('http://127.0.0.1:3000/jobs', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('Network response was not ok');
          }
        })
        .then((data) => setJob(data))
        .catch((error) => console.log(error));
    } else {
      setAuthenticated(false);
    }
  }, []);

  return (
    <>
      <Navigation />
      <section className="jobs__lists-page">
        <div className="job__lists-container">
          {job.map((job) => (
            <article className="job__card-list" key={job.id}>
              <div className="job__job-name">
                <h4>{job.job_name}</h4>
              </div>
              <div className="job__job-description">
                <p>{job.employer.company_name}</p>
                <br/>
               </div>
               <div>
               <p>{job.employer.email}</p>
               </div>

            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Jobs;
