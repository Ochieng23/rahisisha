import React, { useState, useEffect } from "react";

function JobForm() {
  // set up state variables using useState hook
  const [jobCode, setJobCode] = useState("");
  const [jobName, setJobName] = useState("");
  const [description, setDescription] = useState("");
  const [employerCode, setEmployerCode] = useState("");
  const [jobTagCode, setJobTagCode] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");

  // use useEffect hook to fetch user and post data on component mount
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken) {
      setAuthenticated(true);
      fetch("http://127.0.0.1:3000/jobs", {
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
        .then((data) => setPosts(data))
        .catch((error) => console.log(error));

      const [, payloadBase64] = accessToken.split(".");
      const payload = JSON.parse(atob(payloadBase64));
      const userId = payload.user_ref; // extracting the user ID from the access token payload

      fetch(`http://127.0.0.1:3000/users/${userId}`, {
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
        .then((data) => setUser(data.username))
        .catch((error) => console.log(error));
    } else {
      setAuthenticated(false);
    }
  }, []);

  // handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const accessToken = localStorage.getItem("accessToken");

    // make POST request to API with form data
    fetch("http://127.0.0.1:3000/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        job_code: jobCode,
        job_name: jobName,
        description: description,
        employer_code: employerCode,
        jobtag_code: jobTagCode,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Job posted successfully!");
          setJobCode("");
          setJobName("");
          setDescription("");
          setEmployerCode("");
          setJobTagCode("");
        } else {
          alert("Failed to post job");
        }
      })
      .catch((error) => {
        alert("Error posting job: " + error);
      });
  };
  return (
    <form onSubmit={handleSubmit} style={{width:"600px",border:"1px solid black"}}>
      <label>
        Job Name:
        <input
          type="text"
          value={jobName}
          onChange={(e) => setJobName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
</form>
  );
}

export default JobForm;
