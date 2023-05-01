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
import CreatePost from "./Main Page/CreatePost";
import Navbar from "../Components/Main Page/Navbar";
import Comments from "./Comments";

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
  const [likecount, setLikesCount] = useState(false);

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

  // Like function

  const handleLike = (posts) => {
    const accessToken = localStorage.getItem("accessToken");

    const postCode = posts.post_code;

    if (liked) {
      // Remove the like from the post
      axios
        .patch(`http://127.0.0.1:3000/posts/${postCode}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          setLiked(false);
          setLikesCount((prevCount) => prevCount - 1);
        })
        .catch((error) => console.log(error));
    } else {
      // Add a like to the post
      axios
        .post(
          `http://127.0.0.1:3000/posts/${postCode}`,
          {},
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .then((response) => {
          setLiked(true);
          setLikesCount((prevCount) => prevCount + 1);
        })
        .catch((error) => console.log(error));
    }
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
          <div className="homepage__posts ">
            <div
              className="home__page-posts"
              style={{ border: "2px solid red" }}
            >
              <div className="">
                <div className="create__posts" style={{ display: "none" }}>
                  <div className="flex flex-col space-y-4 rounded-lg shadow-lg bg-white p-4">
                    <div className="flex space-x-4">
                      <img
                        className="w-12 h-12 rounded-full object-cover"
                        src="https://source.unsplash.com/random"
                        alt="Profile"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">John Doe</h3>
                        <p className="text-gray-500 text-sm">
                          Software Engineer at Example Company
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="post-title" className="font-bold text-lg">
                        Title
                      </label>
                      <input
                        id="post-title"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        placeholder="Enter your title"
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="post-body" className="font-bold text-lg">
                        Body
                      </label>
                      <textarea
                        id="post-body"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Write your post"
                      ></textarea>
                    </div>
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label
                          htmlFor="post-image"
                          className="font-bold text-lg"
                        >
                          Image
                        </label>
                        <input
                          id="post-image"
                          className="w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          type="file"
                        />
                      </div>
                      <button
                        className="flex-none px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="button"
                      >
                        Post
                      </button>
                    </div>
                  </div>

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
                          <Comments postCode={post.post_code}/>
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
    {comment.user && <p>Comment by: {comment.user.username}</p>}
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
