import { React, useState } from "react";
import axios from "axios";
import { BiUserCircle } from "react-icons/bi";

import { GrUserWorker } from "react-icons/gr";
import { AiOutlineFieldTime } from "react-icons/ai";
import { BsCashStack } from "react-icons/bs";

import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiUser } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";

const SeekersList = () => {
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    avatar: null,
    location: "",
    preferredJob: "",
    available: "",
    anticipatedSalary: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const uploadImage = (files) => {
    const cloudinaryUploadPreset = "hcdgzzgi";
    const cloudinaryCloudName = "dhz4c0oae";

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", cloudinaryUploadPreset);

    return axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        formData
      )
      .then((response) => {
        // Handle successful upload
        console.log("Upload successful:", response.data);
        // You can access the uploaded image URL from response.data.url or response.data.secure_url
        // Update the avatar URL in formValues state
        setFormValues({ ...formValues, avatar: response.data.secure_url });
      })
      .catch((error) => {
        // Handle upload error
        console.error("Upload error:", error);
        // Handle any error messages or perform any other error handling tasks
      });
  };


  console.log(formValues)

  const handleUpdate = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // You can access the form values from formValues state
    console.log("Form values:", formValues);

    // Get the accessToken from local storage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("Access token not found in local storage.");
      return;
    }

    // Decode the accessToken to obtain user_code
    const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
    const userCode = decodedToken.user_code;

    // Fetch API to send form data with user_code
    fetch("http://127.0.0.1:3000/seekers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include user_code in Authorization header
      },
      body: JSON.stringify(formValues), // Convert formValues to JSON string
    })
      .then((response) => {
        // Handle response
        if (response.ok) {
          // Success response
          console.log("Form data updated successfully!");
        } else {
          // Error response
          console.error("Failed to update form data.");
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Failed to update form data.", error);
      });
  };

  return (
    <form
      action=""
      className="form__modal"
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        border: "2px solid black",
        padding: "5px",
      }}
    >
      <div className="form__group">
        <div className="form__group-header">
          <BiUser />
          <label htmlFor="">Enter Full Name</label>
        </div>
        <div className="form__group-input">
          <input
            type="text"
            placeholder="Enter your full name"
            name="fullName"
            value={formValues.fullName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form__group">
        <div className="form__group-header">
          <MdOutlineMarkEmailUnread />
          <label htmlFor="">Email</label>
        </div>
        <div className="form__group-input">
          <input
            type="text"
            placeholder="Enter your current email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form__group">
        <div className="form__group-header">
          <BiUserCircle />
          <label htmlFor="">Avatar</label>
        </div>
        <div className="form__group-input">
          <input
            type="file"
            name="avatar"
            value={formValues.avatar ? formValues.avatar.name : ""} // Set value to file name or empty string
            onChange={(event) => uploadImage(event.target.files)}
          />
        </div>
      </div>

      <div className="form__group">
        <div className="form__group-header">
          <HiOutlineLocationMarker />
          <label htmlFor="">Location</label>
        </div>
        <div className="form__group-input">
          <input
            type="text"
            placeholder="Enter your current Location"
            name="location"
            value={formValues.location}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form__group">
        <div className="form__group-header">
          <GrUserWorker />
          <label htmlFor="">Preferred Job</label>
        </div>
        <div className="form__group-input">
          <input
            type="text"
            placeholder="Enter your preferred job"
            name="preferred-job"
            value={formValues.preferredJob}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form__group">
        <div className="form__group-header">
          <AiOutlineFieldTime />
          <label htmlFor="">Availability</label>
        </div>
        <div className="form__group-input">
          <input
            type="text"
            placeholder="How soon can you receive job opportunities"
            name="available"
            value={formValues.available}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form__group">
        <div className="form__group-header">
          <BsCashStack />
          <label htmlFor="">Anticipated Salary</label>
        </div>
        <div className="form__group-input">
          <input
            type="text"
            placeholder="Enter your anticipated salary"
            name="anticipatedSalary"
            value={formValues.anticipatedSalary}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form__group">
        <div className="form__group-header">
          <BsTelephone />
          <label htmlFor="phone-number">Phone number</label>
        </div>
        <div className="form__group-input">
          <input
            type="text"
            placeholder="Enter your current phone number"
            name="phone-number"
            id="phone-number" // Update with an appropriate ID
            value={formValues.phoneNumber}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form__group-button">
        <button
          type="submit"
          className="form__group-save"
          onClick={handleUpdate}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default SeekersList;
