import React from "react";
import "./profile.css";
import { TbEdit } from "react-icons/tb";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import Navigation from "./Navigation";
import axios from "axios";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50rem",
    border: "3px solid black",
  },
};


function PostForm() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);



  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleChange(event) {
    // Extract the name and value from the event target
    const { name, value } = event.target;
    // Update the state with the new value
    if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    }
  }


  const uploadImage = async (files) => {
    const cloudinaryUploadPreset = "hcdgzzgi";
    const cloudinaryCloudName = "dhz4c0oae";

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", cloudinaryUploadPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        formData
      );
      // Handle successful upload
      console.log("Upload successful:", response);

      setMedia(response.data.secure_url); // Update this line to access the secure_url property from the response data
    } catch (error) {
      // Handle upload error
      console.error("Upload error:", error);
    }
  };

  function handleSaveClick() {
    try {
      const accessToken = localStorage.getItem("accessToken");
  
      if (!accessToken) {
        console.error("Access token not found in local storage.");
        return;
      }
  
      const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
      const userCode = decodedToken.user_ref;
  
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("media", media);
      formData.append("post_code", "<%= SecureRandom.hex(10) %>"); // Replace with your own implementation to generate post code
      formData.append("likes", 0);
      formData.append("user_code", userCode); // Extract user_code from decoded payload
      formData.append("authenticity_token", "");
      axios
        .post("http://127.0.0.1:3000/posts", formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // Handle successful response
          console.log("Post created:", response.data);
          closeModal();
        })
        .catch((error) => {
          console.error("Post creation error:", error);
        });
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }
  return (
    <div style={{display:"block"}}>
      <form
  action="/posts"
  method="post"
  class="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
>
  <div class="mb-4">
    <label
      class="block text-gray-700 text-sm font-bold mb-2"
      for="title"
    >
      Enter Title
    </label>
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="title"
      type="text"
      placeholder="Enter your Title"
      name="title"
      value={title} // Assuming you are using React and have state for form data
      onChange={handleChange} // Replace with your own function to handle title input change
    />
  </div>
  <div class="mb-4">
    <label
      class="block text-gray-700 text-sm font-bold mb-2"
      for="description"
    >
      Description
    </label>
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="description"
      type="text"
      placeholder="Enter a description"
      name="description"
      value={description} // Assuming you are using React and have state for form data
      onChange={handleChange} // Replace with your own function to handle description input change
    />
  </div>
  <div class="mb-4">
    <label
      class="block text-gray-700 text-sm font-bold mb-2"
      for="media"
    >
      Media
    </label>
    <div class="flex items-center justify-between">
      <input
        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="media"
        type="file"
        name="media"
        onChange={(event) =>
          uploadImage(event.target.files)
        } // Replace with your own function to handle media input change
      />
      <svg
        class="h-6 w-6 text-gray-400 hover:text-gray-500 cursor-pointer"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          d="M12 4v16m8-8H4"
        ></path>
      </svg>
    </div>
  </div>
  <div class="flex items-center justify-between">
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="button"
      onClick={handleSaveClick}
    >
      Save
    </button>{" "}
    
  </div>
  <input
    type="hidden"
    name="post_code"
    value="<%= SecureRandom.hex(10) %>"
  />
  <input
    type="hidden"
    name="likes"
    value="0" // You can use this if you want to set the initial value of likes to 0
  />
</form>

    </div>
  )
}

export default PostForm;