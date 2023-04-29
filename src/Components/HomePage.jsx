import React from "react";
import { useState, useEffect } from "react";
import "./home.css";
import { AiFillEdit } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi";
import { GrUserWorker } from "react-icons/gr";
import { AiOutlineFieldTime } from "react-icons/ai";
import { BsCashStack } from "react-icons/bs";
import { BsPlayCircle, BsWindowSidebar } from "react-icons/bs";
import { TbPhotoCheck } from "react-icons/tb";
import { BiCalendar } from "react-icons/bi";
import { SlLike } from "react-icons/sl";
import { FaRegCommentAlt } from "react-icons/fa";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiUser } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";
import Modal from "react-modal";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import Post from "./Post";
import axios from "axios";
import SeekersList from "./SeekersList";

const customStyles = {
  content: {
    top: "50%",
    left: "55%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50rem",
    border: "3px solid black",
  },
};

function HomePage() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [posts, setPost] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const [user, setUser] = useState([]);

  // fetching posts
  useEffect(() => {
    const getPosts = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          console.error("Access token not found in localStorage");
          return;
        }

        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const response = await fetch("http://127.0.0.1:3000/posts", {
          headers,
        });

        if (!response.ok) {
          throw new Error(
            `Error fetching posts: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();

        JSON.stringify(data);

        setPost(data);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the getPosts function
    getPosts();
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal2 = () => {
    setIsOpen2(true);
  };

  const closeModal2 = () => {
    setIsOpen2(false);
  };

  const openModal2 = () => {
    setIsOpen2(true);
  };

  const closeModal2 = () => {
    setIsOpen2(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    window.location.href = "/login";
    setUser(null);
  };

  // Like function

  const handleLike = (posts) => {
    const accessToken = localStorage.getItem("accessToken");

    const postCode = posts.post_code;

    axios
      .patch(
        `http://127.0.0.1:3000/posts/${postCode}`,
        {
          likes: 1, // Increment likes by 1
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log("Post liked successfully:", response.data);
      })
      .catch((error) => {
        console.error("Failed to like post:", error);
      });
  };

  console.log(posts);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // posting a post
  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("file", file);

      const response = await fetch(
        "https://rahisisha-backend-3t0w.onrender.com/posts",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setUser(response.data);
        console.log("Post request success!");
      } else {
        console.log("Post request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Post request failed:", error);
    }
    console.log(user);
  };

  //fetching user details
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

  console.log(user);

  return (
    <>
      <Navigation />
      <section className="home__page">
        <div className="home__page-container">
          <aside className="home__page-profile">
            <article className="home__profile-info">
              <div className="home__profile-top">
                <div className="home__profile-bg"></div>
                <div className="home__profile-image">
                  <Link to="/profile">
                    {user && user.seeker && user.seeker.avatar && (
                      <img src={user.seeker.avatar} alt="" />
                    )}
                  </Link>
                </div>
              </div>
              <div className="home__profile-content">
                <div className="home__profile-title">
                  {user?.seeker?.full_name ? (
                    <>
                      <h4>{user.seeker.full_name} </h4>
                      <span>{user.seeker.email} </span>
                    </>
                  ) : (
                    <>
                      <h4>Loading...</h4>
                    </>
                  )}
                </div>

                <div className="home__profile-body">
                  <div className="profile__body-icon">
                    <div className="icon__profile">
                      <AiFillEdit />
                    </div>
                    <div className="content__profile">
                      <strong onClick={openModal}>Edit Profile</strong>
                      <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                      >
                        <div className="modal__header">
                          <strong ref={(_subtitle) => (subtitle = _subtitle)}>
                            Edit Your Profile
                          </strong>
                        </div>
                        <div
                          className="modal__body"
                          style={{ overflowY: "auto", textAlign: "center" }}
                        >
                          <SeekersList />
                        </div>
                      </Modal>
                    </div>
                  </div>
                  <div className="profile__body-icon">
                    <div className="icon__profile">
                      <HiOutlineUsers />
                    </div>
                    <div className="content__profile">
                      <Link to="/community">Community</Link>
                    </div>
                  </div>
                  <div className="profile__body-icon">
                    <div className="icon__profile">
                      <HiOutlineUsers />
                    </div>
                    <div className="content__profile">
                      <Link to="/notification">Notifications</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="profile__log-out">
                <button className="button-lg" onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            </article>
          </aside>
          <div className="homepage__posts">
            <div className="home__page-posts">
              <div className="home__create-post">
                <div className="create__posts">
                  <div className="create__posts-avatar">
                    <img
                      src="https://images.pexels.com/photos/16161517/pexels-photo-16161517.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
                      alt=""
                    />
                  </div>
                  <div className="create__posts-input">
                    <form action="" className="form">
                      <input type="Create a post" />
                      <button type="submit">Post</button>
                    </form>
                  </div>
                </div>
                <div className="create__post-types">
                  <div className="posts__icon-video">
                    <BsPlayCircle />
                    <Popup
                      trigger={<small>Videos</small>}
                      position="center"
                      className="my-popup"
                    >
                      <div className="popup_body">
                        <div className="popup_body-header">
                          <h5>Video Posts</h5>
                        </div>
                        <div className="popup_form">
                          <form action="" className="popup_form">
                            <div className="popup_form-input">
                              <input type="text" placeholder="Title" />
                              <input
                                type="text"
                                placeholder="Write a description"
                              />
                              <input type="file" name="" id="" />
                            </div>
                            <div className="form__group-button">
                              <button className="form__group-save">Save</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </Popup>
                  </div>
                  <div className="posts__icon-photo">
                    <TbPhotoCheck />
                    <small>Photos</small>
                  </div>
                  <div className="posts__icon-date">
                    <BiCalendar />
                    <small>Events</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="posts__lists">
              {Array.isArray(posts) &&
                posts.map((post) => (
                  <article
                    className="posts__lists-card"
                    style={{
                      width: "100%",
                      marginTop: "6px",
                    }}
                    key={post.id}
                  >
                    <div
                      className="posts__card-profile"
                      style={{ padding: "2px", height: "auto" }}
                    >
                      <div className="card__profile-avatar">
                        {post.seeker && post.seeker.avatar ? (
                          <img src={post.seeker.avatar} alt="" />
                        ) : (
                          <img
                            src="default-avatar.jpg" // or a default avatar image URL
                            alt=""
                          />
                        )}

                        <Post />
                      </div>
                      <div className="card__profile-about">
                        <h5>{post.title}</h5>
                        <small>Nairobi, Kenya</small>
                      </div>
                    </div>
                    <div className="profile__card-posts">
                      <div className="posts__card-content col-md-6">
                        <small style={{ marginBottom: "3px" }}>
                          {post.description}
                        </small>
                      </div>
                      <div className="posts__card-image col-md-6">
                        <img
                          className="img-fluid"
                          src={post.media}
                          alt=""
                          style={{
                            display: "block",
                            height: "520px",
                            width: "100%",
                            objectFit: "cover",
                            objectPosition: "50% 60%",
                          }}
                        />
                      </div>

                      <div className="posts__card-buttons">
                        <div className="buttons__like-card">
                          <button onClick={handleLike} className="like">
                            <SlLike />
                          </button>
                          <h5>{post.likes}</h5>
                        </div>
                        <div className="buttons__comment-card">
                          <button className="comment">

                            
          

                          <FaRegCommentAlt onClick={openModal2}/>
                            <Modal
                                  isOpen={modalIsOpen2}
                                  onRequestClose={closeModal2}
                                  style={customStyles}
                                >
                                  <div className="modal__header">
                                    <strong ref={(_subtitle) => (subtitle = _subtitle)}>Comments</strong>
                                  </div>
                                  <div
                                    className="modal__body"
                                    style={{ overflow: "scroll", textAlign: "center" }}
                                  >
                                    {Array.isArray(posts) &&
                                      posts.map((post) => (
                                        <article className="modal2__card">
                                          {post.comments &&
                                            post.comments.map((comment) => (
                                              <p key={comment.id}>{comment.content}</p>
                                            ))}
                                        </article>
                                      ))}
                                  </div>
                                </Modal>
                          </button>
                          <h5>Comment</h5>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;

// const [isExpired, setIsExpired] = useState(false)

//   function decodeToken(token) {
//     console.log(token)
//     if (token === null || token === "undefined") {
//       console.log("refresh token can not be decoded, no session found")
//       navigate("/")
//     } else {
//       console.log("valid token, trying to determine expiry time...")
//       const decodedRefreshToken = jwt_decode(token)
//       const expired = dayjs.unix(decodedRefreshToken.exp).diff(dayjs()) < 1;
//       return setIsExpired(expired)
