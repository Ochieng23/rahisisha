import React from 'react';
import './admin.css'
import { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import {  Link } from 'react-router-dom';
import { HiOutlineUsers } from 'react-icons/hi'
import { MdOutlineMarkEmailUnread } from 'react-icons/md'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { BiUser } from 'react-icons/bi'
import { BsTelephone } from 'react-icons/bs'
import Modal from 'react-modal'
import Manageposts from './Manageposts';
import Manage_employers from './Manage_employers';
import Manageusers from './Manageusers';
import Navigation from './Navigation';

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

function Admin() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [showManagePosts, setShowManagePosts] = useState(true);
  const [showManageUsers, setShowManageUsers] = useState(false);
  const [showManageEmployers, setShowManageEmployers] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleManagePostsClick() {
    setShowManagePosts(true);
    setShowManageUsers(false);
    setShowManageEmployers(false);
  }

  function handleManageUsersClick() {
    setShowManagePosts(false);
    setShowManageUsers(true);
    setShowManageEmployers(false);
  }

  function handleManageEmployersClick() {
    setShowManagePosts(false);
    setShowManageUsers(false);
    setShowManageEmployers(true);
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');
    window.location.href= '/login';
  }
    return (
      <>
      <Navigation/>
       <section className="home__page">
        <div className="home__page-container">
          <aside className="home__page-profile">
            <article className="home__profile-info">
              <div className="home__profile-top">
                  <div className="home__profile-bg">

                  </div>
                  <div className="home__profile-image">
                    <Link to='/profile'>
                      <img src="https://images.pexels.com/photos/16161517/pexels-photo-16161517.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" alt="" />
                    </Link>
                  </div>
              </div>
              <div className="home__profile-content">
                <div className="home__profile-title">
                  <h4>Jane Doe</h4>
                  <span>Admin, Nairobi Kenya</span>
                </div>
                <div className="home__profile-body">
                  <div className="profile__body-icon">
                    <div className="icon__profile">
                      <AiFillEdit/>
                    </div>
                    <div className="content__profile">
                    <strong onClick={openModal}>Edit Profile</strong>
                      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
                                <div className="modal__header">
                                    <strong ref={(_subtitle) => (subtitle = _subtitle)}>Edit Your Profile</strong>
                                </div>
                                <div className="modal__body">
                                    <form action="" className="form__modal">
                                        <div className="form__group">
                                            <div className="form__group-header">
                                                <BiUser/>
                                                <label htmlFor="">Enter Full Name</label>   
                                            </div>
                                            <div className="form__group-input">
                                                <input type="text" placeholder='Enter your current email'/>
                                            </div>
                                        </div>
                                        <div className="form__group">
                                            <div className="form__group-header">
                                                <MdOutlineMarkEmailUnread/>
                                                <label htmlFor="">Email</label>                                            
                                            </div>
                                            <div className="form__group-input">
                                                <input type="text" placeholder='Enter your current email'/>
                                            </div>
                                        </div>
                                        <div className="form__group">
                                            <div className="form__group-header">
                                                <HiOutlineLocationMarker/>
                                                <label htmlFor="">Location</label>                                            
                                            </div>
                                            <div className="form__group-input">
                                                <input type="text" placeholder='Enter your current email'/>
                                            </div>
                                        </div>
                                        <div className="form__group">
                                            <div className="form__group-header">
                                                <BsTelephone/>
                                                <label htmlFor="">Phone number</label>                                           
                                            </div>
                                            <div className="form__group-input">
                                                <input type="text" placeholder='Enter your current email'/>
                                            </div>
                                        </div>
                                        <div className="form__group-button">
                                            <button className="form__group-save">Save</button>
                                        </div>

                                    </form>
                                </div>
                            </Modal>
                    </div>
                  </div>
                  <div className="profile__body-icon">
                    <div className="icon__profile">
                      <HiOutlineUsers/>
                    </div>
                    <div className="content__profile">
                      <Link to='/notification'>Notifications</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="profile__log-out">
                <button className="button-lg" onClick={handleLogout}>Log Out</button>
              </div>
            </article>
          </aside>
          <div className="admin__dashboard">
            <div className="dashboard__container">
              <div className="dashboard__sidebar">
                  <a onClick={handleManagePostsClick}>Manage Posts</a>
                  <a onClick={handleManageUsersClick}>Manage Users</a>
                  <a onClick={handleManageEmployersClick}>Manage Employers</a>
              </div>
              <div className="dashboard__show-manage">
              {showManagePosts && <Manageposts />}
              {showManageUsers && <Manageusers />}
              {showManageEmployers && <Manage_employers />}
              </div>
            </div>
          </div>
        </div>
      </section>
      </>
    )
  
}

export default Admin;

