import {React, useState} from 'react'

function Employerform() {
    const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  
 

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get the access token from local storage
    const accessToken = localStorage.getItem("accessToken");
    const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
      const userCode = decodedToken.user_ref;

    // Prepare the form data
    const formData = new FormData();
    formData.append("company_name", companyName);
    formData.append("email", email);
    formData.append("phone_number", phoneNumber);
    formData.append("verified", false);
    formData.append("user_code", userCode);

    // Send the form data to the /employers endpoint with the access token
    const response = await fetch("http://127.0.0.1:3000/employers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    // Handle the response
    if (response.ok) {
      // The form data was successfully submitted
      console.log("Form data submitted successfully!");
    } else {
      // There was an error submitting the form data
      console.error("Error submitting form data.");
    }
  };

  return (
    <form onSubmit={handleSubmit} 
    className="form__modal"
    style={{
      Width: "400px",
      margin: "0 auto",

      padding: "5px",
    }}>
      <div className="form-group">
        <label htmlFor="companyName">Company Name:</label>
        <input
          type="text"
          className="form-control"
          id="companyName"
          value={companyName}
          onChange={(event) => setCompanyName(event.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          className="form-control"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
          required
        />
      </div>

     

     

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};


export default Employerform