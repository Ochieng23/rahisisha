import React from 'react'
import { useState } from 'react'
import './community.css'
import { AiFillEdit } from 'react-icons/ai'
import { RiMessage3Line } from 'react-icons/ri'
import { GrUserWorker } from "react-icons/gr";
import { AiOutlineFieldTime } from "react-icons/ai";
import { BsCashStack } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { HiOutlineUsers } from 'react-icons/hi'
import { MdOutlineMarkEmailUnread } from 'react-icons/md'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { BiUser } from 'react-icons/bi'
import { BsTelephone } from 'react-icons/bs'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import Navbar from "../Components/Main Page/Navbar";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '50rem',
      border: '3px solid black'
    },
  };

function Community() {
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userRole');
        window.location.href= '/login'
    }

  return (
    <>
    <Navbar/>
        <section className="community__page">
        <div className="landing__page-container" style={{ marginTop: "1px" }}>
         <div className="landing__page-image">
           <img src='https://img.freepik.com/free-vector/flat-international-human-solidarity-day-illustration_23-2149844026.jpg' alt="" />
         </div>
         <div className="landing__page-start">
           <div className="landing__page-content">
             <div className="content__header">
               <h2>
                 Rahisisha Community
               </h2>
             </div>
             <div className="content__body">
               <p>
                 The aim of Rahisisha is to reduce the journey of Young
                 Africans to get job opportunities while providing companies
                 with a pool of skilled and ambitious talent
               </p>
               <p>
                 The aim of Rahisisha is to reduce the journey of Young
                 Africans to get job opportunities while providing companies
                 with a pool of skilled and ambitious talent
               </p>
               <p>
                 The aim of Rahisisha is to reduce the journey of Young
                 Africans to get job opportunities while providing companies
                 with a pool of skilled and ambitious talent
               </p>
               <p>
                 The aim of Rahisisha is to reduce the journey of Young
                 Africans to get job opportunities while providing companies
                 with a pool of skilled and ambitious talent
               </p>
               <p>
                 The aim of Rahisisha is to reduce the journey of Young
                 Africans to get job opportunities while providing companies
                 with a pool of skilled and ambitious talent
               </p>
             </div>
           </div>
           <div className="landing__page-button">
             <a href='https://rahisisha-chat-max101.vercel.app/' className='community'>
              <span>Join our community</span>
             </a>
           </div>
         </div>
       </div>
        </section>
    </>
  )
}

export default Community