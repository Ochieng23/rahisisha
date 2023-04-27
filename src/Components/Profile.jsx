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

function Profile() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  //fetch user details based on role
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      try {
        const decodedToken = JSON.parse(atob(accessToken.split(".")[1])); //use jwt
        const user_code = decodedToken.user_ref;

        console.log(user_code);

        fetch(`http://127.0.0.1:3000/users/${user_code}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Set the access token as a Bearer token
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch user details");
            }
            return response.json();
          })
          .then((response) => {
            console.log(response);

            setUser(response);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.error("Failed to decode access token", error);
      }
    } else {
      console.error("Access token not found in localStorage");
    }
  }, []);



console.log(user)
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

  console.log(media); // Note that this will log the media state, but it may not reflect the updated value immediately after uploading the image, as it is an asynchronous operation.

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
        })
        .catch((error) => {
          console.error("Post creation error:", error);
        });
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  return (
    <>
      <Navigation />
      <section className="profile__page">
        <div className="profile__page-container">
          <article
            className="profile__page-content"
            style={{ border: "2px solid red" }}
          >
            <div
              className="profile__page-profile"
              style={{ border: "2px solid yellow" }}
            >
              <div className="profile__page-background"></div>
              <div
                className="profile__page-avatar"
                style={{ border: "2px solid green" }}
              >
                {user ? (
                  <>
                    {role === "seeker" && user.seeker ? (
                      <img src={user.seeker.avatar} alt="Seeker avatar" />
                    ) : role === "employer" && user.employer ? (
                      <img src={user.employer.avatar} alt="Employer avatar" />
                    ) : (
                      <p>User profile is incomplete.</p>
                    )}
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
            <div className="profile__card-body">
              <div className="profile__card-about">
                {user ? (
                  <>
                    {role === "seeker" ? (
                      <p>{user.username}</p>
                    ) : (
                      <p>{user.username}</p>
                    )}
                  </>
                ) : (
                  <p>Loading...</p>
                )}
                <span>Software Engineer</span>
                <div className="profile__about">
                  <span>
                    {" "}
                    {user ? (
                      <>
                        {role === "seeker" && user.seeker ? (
                          <p>
                            {user.seeker.location || "Location not available"}
                          </p>
                        ) : role === "employer" && user.employer ? (
                          <p>
                            {user.employer.company_name ||
                              "Company name not available"}
                          </p>
                        ) : (
                          <p>User profile is incomplete.</p>
                        )}
                      </>
                    ) : (
                      <p>Loading...</p>
                    )}
                  </span>
                  <h5 onClick={openModal}>Create a post</h5>
                  <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                  >
                    <div className="modal__header">
                      <strong ref={(_subtitle) => (subtitle = _subtitle)}>
                        Create a post
                      </strong>
                    </div>
                    <div
                      className="modal__body"
                      style={{ overflowY: "auto", textAlign: "center" }}
                    >
                      <form
                        action="/posts"
                        method="post"
                        className="form__modal"
                      >
                        <div className="form__group">
                          <div className="form__group-header">
                            <label htmlFor="">Enter Title</label>
                          </div>
                          <div className="form__group-input">
                            <input
                              type="text"
                              placeholder="Enter your Title"
                              name="title"
                              value={title} // Assuming you are using React and have state for form data
                              onChange={handleChange} // Replace with your own function to handle title input change
                            />
                          </div>
                        </div>
                        <div className="form__group">
                          <div className="form__group-header">
                            <label htmlFor="">Description</label>
                          </div>
                          <div className="form__group-input">
                            <input
                              type="text"
                              placeholder="Enter a description"
                              name="description"
                              value={description} // Assuming you are using React and have state for form data
                              onChange={handleChange} // Replace with your own function to handle description input change
                            />
                          </div>
                        </div>
                        <div className="form__group">
                          <div className="form__group-header">
                            <label htmlFor="">Media</label>
                          </div>
                          <div className="form__group-input">
                            <input
                              type="file"
                              name="media"
                              onChange={(event) =>
                                uploadImage(event.target.files)
                              } // Replace with your own function to handle media input change
                            />
                          </div>
                        </div>
                        <div className="form__group-button">
                          <button
                            type="button"
                            className="form__group-save"
                            onClick={handleSaveClick}
                          >
                            Save
                          </button>{" "}
                          // Replace with your own function to handle save
                          button click
                        </div>
                        <input
                          type="hidden"
                          name="post_code"
                          value="<%= SecureRandom.hex(10) %>"
                        />
                        <input type="hidden" name="likes" value="0" />
                        <input
                          type="hidden"
                          name="user_code"
                          value="<%= current_user.user_code %>"
                        />
                        <input
                          type="hidden"
                          name="authenticity_token"
                          value="<%= form_authenticity_token %>"
                        />
                      </form>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          </article>
          <div className="profle__page-edit">
            <article className="edit__work">
              <div className="edit__header">
                <h4>Work</h4>
                <TbEdit />
              </div>
              <div className="edit__content">
                <span>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Ullam quidem porro reprehenderit iure, corporis qui.
                </span>
              </div>
            </article>
            <article className="edit__work">
              <div className="edit__header">
                <h4>Company</h4>
                <TbEdit />
              </div>
              <div className="edit__content">
                <span>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Ullam quidem porro reprehenderit iure, corporis qui.
                </span>
              </div>
            </article>
            <article className="edit__work">
              <div className="edit__header">
                <h4>Skills</h4>
                <TbEdit />
              </div>
              <div className="edit__content">
                <span>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Ullam quidem porro reprehenderit iure, corporis qui.
                </span>
              </div>
            </article>
          </div>
          <div className="profile__page-activity">
            <div className="profile__page-active">
              <article className="activity__card">
                <div className="activity__card-comment">
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iure, cupiditate?
                  </span>
                </div>
                <div className="activity__card-image">
                  <img
                    src="https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                  />
                </div>
                <div className="activity__card-buttons">
                  <button className="edit">Edit</button>
                  <button className="delete">Delete</button>
                </div>
              </article>
              <article className="activity__card">
                <div className="activity__card-comment">
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iure, cupiditate?
                  </span>
                </div>
                <div className="activity__card-image">
                  <img
                    src="https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                  />
                </div>
                <div className="activity__card-buttons">
                  <button className="edit">Edit</button>
                  <button className="delete">Delete</button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
