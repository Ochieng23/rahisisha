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
import CreatePost from "../Components/Main Page/CreatePost";
import Navbar from "../Components/Main Page/Navbar";
import Comments from "./Comments";
import PostForm from "./PostForm";

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
  const [role, setRole] = useState(null);
  const [user, setUser] = useState([]);
  const [formx, setForm] = useState(false);
  const [liked, setLiked] = useState(false);

  // post form section

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
    setIsOpen(true);
  };

  const closeModal2 = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    window.location.href = "/login";
    setUser(null);
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
        setRole(decodedToken.role);
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
      <div>
        <Navbar />
      </div>
      <section className="home__page" style={{ marginTop: "70px" }}>
        <div className="home__page-container">
          <aside className="home__page-profile">
            <article
              className="home__profile-info"
              style={{ position: "fixed" }}
            >
              <div className="home__profile-top">
                <div className="home__profile-bg"></div>
                <div className="home__profile-image">
                  <Link to="/profile">
                    {user && (
                      <img
                        src={
                          role === "seeker"
                            ? user?.seeker?.avatar
                            : user?.employer?.avatar
                        }
                        alt=""
                      />
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
                </div>
              </div>
              <div className="profile__log-out">
                <button className="button-lg" onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            </article>
          </aside>
          {/* post form */}
          <div className=" ">
            <div
              className=""
              style={{ border: "1px solid black", borderRadius: "10px" }}
            >
              <div className="">
                <div className="create__posts" style={{ display: "" }}>
                <PostForm />

                  {/* <div className="create__posts-avatar">
                    {user && (
                      <img
                        src={
                          role === "seeker"
                            ? user?.seeker?.avatar
                            : user?.employer?.avatar
                        }
                        alt=""
                      />
                    )}
                  </div> */}
                </div>
                <div className="create__post-types"></div>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-md overflow-hidden">
              {Array.isArray(posts) &&
                posts.map((post) => (
                  <article
                    className="posts__lists-card"
                    style={{
                      height: "auto",
                      width: "100%",
                      marginTop: "10px",
                    }}
                    key={post.id}
                  >
                    <div
                      className="posts__card-profile "
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

                      <div className="card__profile-about ">
                        <h5 className="text-xl font-semibold">{post.title}</h5>
                        <small>Nairobi, Kenya</small>
                      </div>
                    </div>
                    <div className="profile__card-posts ">
                      <div className="posts__card-content col-md-6">
                        <small class="block text-gray-500 mb-5">
                          {post.description}
                        </small>
                      </div>

                      <div className="posts__card-image col-md-6">
                        <img
                          className="mx-auto w-full "
                          src={post.media}
                          alt=""
                          style={{
                            objectFit: "cover",
                            objectPosition: "50% 50%",
                            height: "auto",
                          }}
                        />
                      </div>

                      <div className="posts__card-buttons">
                        <div
                          className="buttons__like-card"
                          style={{ marginBottom: "5px" }}
                        >
                          <Comments postCode={post.post_code} />
                        </div>
                        <div className="buttons__comment-card">
                          <button
                            style={{
                              width: "100px",
                              height: "30px",
                              padding: "2px",
                              border: "2px solid black",
                            }}
                            className="btn btn-dark text-dark mt-2 mx-3 my-1"
                          >
                            <h3 onClick={openModal2}>view</h3>
                            <Modal
                              isOpen={modalIsOpen2}
                              onRequestClose={closeModal2}
                              style={customStyles}
                            >
                              <div className="modal__header">
                                <strong
                                  ref={(_subtitle) => (subtitle = _subtitle)}
                                ></strong>
                              </div>
                              <div
                                className="modal__body"
                                style={{
                                  overflow: "scroll",
                                  textAlign: "center",
                                }}
                              >
                                <article className="modal2__card">
                                  {post.comments.map((comment) => (
                                    <div key={comment.comment_code}>
                                      <p>{comment.content}</p>
                                      {/* check if the user object exists before accessing its 'username' property */}
                                      {comment.user && (
                                        <p>
                                          Comment by: {comment.user.username}
                                        </p>
                                      )}
                                    </div>
                                  ))}
                                </article>
                              </div>
                            </Modal>
                          </button>
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
