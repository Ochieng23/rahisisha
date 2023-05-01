import {React, useEffect, useState} from "react";


import "./profile.css"
import Navbar from "../Components/Main Page/Navbar";

function Profile() {
 const[user, setUser]= useState(null)
 const [role, setRole] = useState(null);
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
    
        if (accessToken) {
          try {
            const decodedToken = JSON.parse(atob(accessToken.split(".")[1])); //use jwt
            const user_code = decodedToken.user_ref;
            
           setRole(decodedToken.role)
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
    
  return (
    <>
   <Navbar/>
       <div className="container mx-auto my-0 p-5 ">
        <div className="md:flex no-wrap md:-mx-2 mt-9 ">
            {/* <!-- Left Side --> */}
            <div className="w-full md:w-3/12 md:mx-2">
                {/* <!-- Profile Card --> */}
                <div className="bg-white p-3 border-t-4 border-green-400">
                    <div className="image overflow-hidden">
                        {/* <img className="h-auto w-full mx-auto"
                            src="https://cdn-icons-png.flaticon.com/512/180/180679.png"
                            alt=""/> */}
                             {user ? (
                  <>
                    {role === "seeker" && user.seeker ? (
                      <img className="h-auto w-full mx-auto"  src={user.seeker.avatar} alt="Seeker avatar" />
                    ) : role === "employer" && user.employer ? (
                      <img className="h-auto w-full mx-auto" src={user.employer.avatar} alt="Employer avatar" />
                    ) : (
                      <p>User profile is incomplete.</p>
                    )}
                  </>
                ) : (
                  <p>Upload avatar...</p>
                )}
                    </div>
                    <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
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
                    </h1>
                    <h3 className="text-gray-600 font-lg text-semibold leading-6">Owner at Her Company Inc.</h3>
                    <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">Lorem ipsum dolor sit amet
                        consectetur adipisicing elit.
                        Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt</p>
                    <ul
                        className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                        <li className="flex items-center py-3">
                            <span>Status</span>
                            <span className="ml-auto"><span
                                    className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                        </li>
                        <li className="flex items-center py-3">
                            <span>Member since</span>
                            <span className="ml-auto">Nov 07, 2016</span>
                        </li>
                    </ul>
                </div>
                {/* <!-- End of profile card --> */}
                <div className="my-4"></div>
                {/* <!-- Friends card --> */}
                <div className="bg-white p-3 hover:shadow">
                    <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                        <span className="text-green-500">
                            <svg class="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </span>
                        <span>Similar Profiles</span>
                    </div>
                    <div className="grid grid-cols-3">
                        <div className="text-center my-2">
                            <img className="h-16 w-16 rounded-full mx-auto"
                                src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
                                alt=""/>
                            Kojstantin
                        </div>
                        <div className="text-center my-2">
                            <img className="h-16 w-16 rounded-full mx-auto"
                                src="https://avatars2.githubusercontent.com/u/24622175?s=60&amp;v=4"
                                alt=""/>
                            James
                        </div>
                        <div className="text-center my-2">
                            <img className="h-16 w-16 rounded-full mx-auto"
                                src="https://img.freepik.com/premium-vector/businesswoman-avatar-cartoon-character-profile_18591-50143.jpg?w=2000"
                                alt=""/>
                            Natie
                        </div>
                        <div className="text-center my-2">
                            <img className="h-16 w-16 rounded-full mx-auto"
                                src="https://img.freepik.com/premium-vector/businessman-character-avatar-icon_24877-8260.jpg?w=2000"
                                alt=""/>
                            Casey
                        </div>
                    </div>
                </div>
                {/* <!-- End of friends card --> */}
            </div>
            {/* <!-- Right Side --> */}
            <div className="w-full md:w-9/12 mx-2 h-64">
                {/* <!-- Profile tab -->
                <!-- About Section --> */}
                <div className="bg-white p-3 shadow-sm rounded-sm">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span className="text-green-500">
                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <span className="tracking-wide">About</span>
                    </div>
                    <div className="text-gray-700">
                        <div className="grid md:grid-cols-2 text-sm">
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">First Name</div>
                                <div className="px-4 py-2">Jane</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Last Name</div>
                                <div className="px-4 py-2">Doe</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Gender</div>
                                <div className="px-4 py-2">Female</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Contact No.</div>
                                <div className="px-4 py-2">+11 998001001</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Current Address</div>
                                <div className="px-4 py-2">Beech Creek, PA, Pennsylvania</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Permanant Address</div>
                                <div className="px-4 py-2">Arlington Heights, IL, Illinois</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Email.</div>
                                <div className="px-4 py-2">
                                    <a className="text-blue-800" href="mailto:jane@example.com">jane@example.com</a>
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Birthday</div>
                                <div className="px-4 py-2">Feb 06, 1998</div>
                            </div>
                        </div>
                    </div>
                    <button
                        className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Show
                        Full Information</button>
                </div>
                {/* <!-- End of about section --> */}

                <div className="my-4"></div>

                {/* <!-- Experience and education --> */}
                <div className="bg-white p-3 shadow-sm rounded-sm">

                    <div className="grid grid-cols-2">
                        <div>
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                <span clas="text-green-500">
                                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </span>
                                <span className="tracking-wide">Experience</span>
                            </div>
                            <ul className="list-inside space-y-2">
                                <li>
                                    <div className="text-teal-600">Owner at Her Company Inc.</div>
                                    <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                </li>
                                <li>
                                    <div className="text-teal-600">Owner at Her Company Inc.</div>
                                    <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                </li>
                                <li>
                                    <div className="text-teal-600">Owner at Her Company Inc.</div>
                                    <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                </li>
                                <li>
                                    <div className="text-teal-600">Owner at Her Company Inc.</div>
                                    <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                <span clas="text-green-500">
                                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path fill="#fff"
                                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                    </svg>
                                </span>
                                <span className="tracking-wide">Education</span>
                            </div>
                            <ul className="list-inside space-y-2">
                                <li>
                                    <div className="text-teal-600">Masters Degree in Oxford</div>
                                    <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                </li>
                                <li>
                                    <div className="text-teal-600">Bachelors Degreen in LPU</div>
                                    <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* <!-- End of Experience and education grid --> */}
                </div>
                {/* <!-- End of profile tab --> */}
            </div>
        </div>
    </div>
    </>
  );
}

export default Profile;






// import React from "react";
// import "./profile.css";
// import { TbEdit } from "react-icons/tb";
// import { useState, useEffect } from "react";
// import Modal from "react-modal";
// import Navigation from "./Navigation";
// import axios from "axios";

// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//     width: "50rem",
//     border: "3px solid black",
//   },
// };

// function Profile() {
//   let subtitle;
//   const [modalIsOpen, setIsOpen] = useState(false);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [media, setMedia] = useState(null);
//   const [user, setUser] = useState(null);
//   const [role, setRole] = useState(null);

//   //fetch user details based on role
//   useEffect(() => {
//     const accessToken = localStorage.getItem("accessToken");

//     if (accessToken) {
//       try {
//         const decodedToken = JSON.parse(atob(accessToken.split(".")[1])); //use jwt
//         const user_code = decodedToken.user_ref;

//         console.log(user_code);

//         fetch(`http://127.0.0.1:3000/users/${user_code}`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${accessToken}`, // Set the access token as a Bearer token
//           },
//         })
//           .then((response) => {
//             if (!response.ok) {
//               throw new Error("Failed to fetch user details");
//             }
//             return response.json();
//           })
//           .then((response) => {
//             console.log(response);

//             setUser(response);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       } catch (error) {
//         console.error("Failed to decode access token", error);
//       }
//     } else {
//       console.error("Access token not found in localStorage");
//     }
//   }, []);



// console.log(user)
//   function openModal() {
//     setIsOpen(true);
//   }

//   function closeModal() {
//     setIsOpen(false);
//   }

//   function handleChange(event) {
//     // Extract the name and value from the event target
//     const { name, value } = event.target;
//     // Update the state with the new value
//     if (name === "title") {
//       setTitle(value);
//     } else if (name === "description") {
//       setDescription(value);
//     }
//   }
//   const uploadImage = async (files) => {
//     const cloudinaryUploadPreset = "hcdgzzgi";
//     const cloudinaryCloudName = "dhz4c0oae";

//     const formData = new FormData();
//     formData.append("file", files[0]);
//     formData.append("upload_preset", cloudinaryUploadPreset);

//     try {
//       const response = await axios.post(
//         `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
//         formData
//       );
//       // Handle successful upload
//       console.log("Upload successful:", response);

//       setMedia(response.data.secure_url); // Update this line to access the secure_url property from the response data
//     } catch (error) {
//       // Handle upload error
//       console.error("Upload error:", error);
//     }
//   };

//   console.log(media); // Note that this will log the media state, but it may not reflect the updated value immediately after uploading the image, as it is an asynchronous operation.

//   function handleSaveClick() {
//     try {
//       const accessToken = localStorage.getItem("accessToken");

//       if (!accessToken) {
//         console.error("Access token not found in local storage.");
//         return;
//       }

//       const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
//       const userCode = decodedToken.user_ref;

//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("description", description);
//       formData.append("media", media);
//       formData.append("post_code", "<%= SecureRandom.hex(10) %>"); // Replace with your own implementation to generate post code
//       formData.append("likes", 0);
//       formData.append("user_code", userCode); // Extract user_code from decoded payload
//       formData.append("authenticity_token", "");
//       axios
//         .post("http://127.0.0.1:3000/posts", formData, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "multipart/form-data",
//           },
//         })
//         .then((response) => {
//           // Handle successful response
//           console.log("Post created:", response.data);
//         })
//         .catch((error) => {
//           console.error("Post creation error:", error);
//         });
//     } catch (error) {
//       console.error("Unexpected error:", error);
//     }
//   }

//   return (
//     <>
//       <Navigation />
//       <section classNameName="profile__page">
//         <div classNameName="profile__page-container">
//           <article
//             classNameName="profile__page-content"
//             style={{ border: "2px solid red" }}
//           >
//             <div
//               classNameName="profile__page-profile"
//               style={{ border: "2px solid yellow" }}
//             >
//               <div classNameName="profile__page-background"></div>
//               <div
//                 classNameName="profile__page-avatar"
//                 style={{ border: "2px solid green" }}
//               >
//                 {user ? (
//                   <>
//                     {role === "seeker" && user.seeker ? (
//                       <img src={user.seeker.avatar} alt="Seeker avatar" />
//                     ) : role === "employer" && user.employer ? (
//                       <img src={user.employer.avatar} alt="Employer avatar" />
//                     ) : (
//                       <p>User profile is incomplete.</p>
//                     )}
//                   </>
//                 ) : (
//                   <p>Loading...</p>
//                 )}
//               </div>
//             </div>
//             <div classNameName="profile__card-body">
//               <div classNameName="profile__card-about">
//                 {user ? (
//                   <>
//                     {role === "seeker" ? (
//                       <p>{user.username}</p>
//                     ) : (
//                       <p>{user.username}</p>
//                     )}
//                   </>
//                 ) : (
//                   <p>Loading...</p>
//                 )}
//                 <span>Software Engineer</span>
//                 <div classNameName="profile__about">
//                   <span>
//                     {" "}
//                     {user ? (
//                       <>
//                         {role === "seeker" && user.seeker ? (
//                           <p>
//                             {user.seeker.location || "Location not available"}
//                           </p>
//                         ) : role === "employer" && user.employer ? (
//                           <p>
//                             {user.employer.company_name ||
//                               "Company name not available"}
//                           </p>
//                         ) : (
//                           <p>User profile is incomplete.</p>
//                         )}
//                       </>
//                     ) : (
//                       <p>Loading...</p>
//                     )}
//                   </span>
//                   <h5 onClick={openModal}>Create a post</h5>
//                   <Modal
//                     isOpen={modalIsOpen}
//                     onRequestClose={closeModal}
//                     style={customStyles}
//                   >
//                     <div classNameName="modal__header">
//                       <strong ref={(_subtitle) => (subtitle = _subtitle)}>
//                         Create a post
//                       </strong>
//                     </div>
//                     <div
//                       classNameName="modal__body"
//                       style={{ overflowY: "auto", textAlign: "center" }}
//                     >
//                       <form
//                         action="/posts"
//                         method="post"
//                         classNameName="form__modal"
//                       >
//                         <div classNameName="form__group">
//                           <div classNameName="form__group-header">
//                             <label htmlFor="">Enter Title</label>
//                           </div>
//                           <div classNameName="form__group-input">
//                             <input
//                               type="text"
//                               placeholder="Enter your Title"
//                               name="title"
//                               value={title} // Assuming you are using React and have state for form data
//                               onChange={handleChange} // Replace with your own function to handle title input change
//                             />
//                           </div>
//                         </div>
//                         <div classNameName="form__group">
//                           <div classNameName="form__group-header">
//                             <label htmlFor="">Description</label>
//                           </div>
//                           <div classNameName="form__group-input">
//                             <input
//                               type="text"
//                               placeholder="Enter a description"
//                               name="description"
//                               value={description} // Assuming you are using React and have state for form data
//                               onChange={handleChange} // Replace with your own function to handle description input change
//                             />
//                           </div>
//                         </div>
//                         <div classNameName="form__group">
//                           <div classNameName="form__group-header">
//                             <label htmlFor="">Media</label>
//                           </div>
//                           <div classNameName="form__group-input">
//                             <input
//                               type="file"
//                               name="media"
//                               onChange={(event) =>
//                                 uploadImage(event.target.files)
//                               } // Replace with your own function to handle media input change
//                             />
//                           </div>
//                         </div>
//                         <div classNameName="form__group-button">
//                           <button
//                             type="button"
//                             classNameName="form__group-save"
//                             onClick={handleSaveClick}
//                           >
//                             Save
//                           </button>{" "}
//                           // Replace with your own function to handle save
//                           button click
//                         </div>
//                         <input
//                           type="hidden"
//                           name="post_code"
//                           value="<%= SecureRandom.hex(10) %>"
//                         />