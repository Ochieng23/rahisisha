import React from "react";
import "./landing.css";
import background from "../Assets/landing-pg-bg1.png";
import connect1 from "../Assets/connect-1.png";
import connect2 from "../Assets/connect-2.png";
import connect3 from "../Assets/connect-3.png";
import connect4 from "../Assets/connect-4.png";
import connect5 from "../Assets/connect-5.png";
import connect6 from "../Assets/connect-6.png";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate()
  return (
    <>
      <Navbar/>
      <section className="landing__page">
      <div className="landing__page-circle" style={{ display: "flex" }}>
          {/* Thousands of verified jobs in a click */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              position: "absolute",
              top: "45%",
              left: "45%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
            }}
          >
            <h3 style={{ color: "black", fontSize: "30px", textAlign: "center", fontWeight:"bolder", marginLeft:"16%" }}>
              Thousands of verified jobs in a click!
            </h3>
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                marginLeft: "30%",
              }}
            >
              <div>
                <input
                  type="text"
                  placeholder="job or keyword"
                  style={{
                    border: "2px solid white",
                    width: "280px",
                    height: "40px",
                  }}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="location"
                  style={{
                    border: "2px solid white",
                    width: "250px",
                    height: "40px",
                    marginLeft: "3px",
                  }}
                />
              </div>
              <div>
                <button
                  style={{
                    border: "2px solid black",
                    width: "100px",
                    height: "40px",
                    padding: "5px",
                    color: "white",
                    backgroundColor: "black",
                    marginLeft: "6px",
                  }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="landing__page-container" style={{ marginTop: "1px" }}>
          <div className="landing__page-image">
            <img src={background} alt="" />
          </div>
          <div className="landing__page-start">
            <div className="landing__page-content">
              <div className="content__header">
                <h2>
                  When passion meets opportunity; there you find Rahisisha
                </h2>
              </div>
              <div className="content__body">
                <p>
                  The aim of Rahisisha is to reduce the journey of Young
                  Africans to get job opportunities while providing companies
                  with a pool of skilled and ambitious talent
                </p>
              </div>
            </div>
            <div className="landing__page-button">
              <button onClick={()=> navigate('/signup')} className="landing-btn ">Get Started</button>
            </div>
          </div>
        </div>
        <div
          class="landing__page-connections container"
          style={{ marginTop: "3px" }}
        >
          <div class="row connections__page-header container">
            <div class="col">
              <h3>Trusted By More Than 100+ companies</h3>
            </div>
          </div>
          <div class="row connections__page-holder">
            <div class="col-sm-4 col-md-2 connections__image">
              <img src={connect1} alt="" />
            </div>
            <div class="col-sm-4 col-md-2 connections__image">
              <img src={connect2} alt="" />
            </div>
            <div class="col-sm-4 col-md-2 connections__image">
              <img src={connect3} alt="" />
            </div>
            <div class="col-sm-4 col-md-2 connections__image">
              <img src={connect4} alt="" />
            </div>
            <div class="col-sm-4 col-md-2 connections__image">
              <img src={connect5} alt="" />
            </div>
            <div class="col-sm-4 col-md-2 connections__image">
              <img src={connect6} alt="" />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default LandingPage;
