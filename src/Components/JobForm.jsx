import React, { useState } from "react";

function JobForm() {
  const [jobCode, setJobCode] = useState("");
  const [jobName, setJobName] = useState("");
  const [description, setDescription] = useState("");
  const [employerCode, setEmployerCode] = useState("");
  const [jobTagCode, setJobTagCode] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch("http://127.0.0.1:3000/jobs", {
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
      });

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
    } catch (error) {
      alert("Error posting job: " + error);
    }
  };

  return (
    <form onSubmit={handleSubmit}  className="form__modal"
    style={{
      Width: "600px",
      margin: "0 auto",

      padding: "5px",
    }}>
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
      <label>
        Employer Code:
        <input
          type="text"
          value={employerCode}
          onChange={(e) => setEmployerCode(e.target.value)}
        />
      </label>
      <br />
      <label>
        Jobtag Code:
        <input
          type="text"
          value={jobTagCode}
          onChange={(e) => setJobTagCode(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default JobForm;
