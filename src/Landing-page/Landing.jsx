import React from 'react'
import './landing.css'
import connect1 from '../Assets/connect-1.png'
import connect2 from '../Assets/connect-2.png'
import connect3 from '../Assets/connect-3.png'
import connect4 from '../Assets/connect-4.png'
import connect5 from '../Assets/connect-5.png'
import connect6 from '../Assets/connect-6.png'
import background from '../Assets/landing-pg-bg1.png'
import Footer from '../Footer/Footer'

function Landing() {
  return (
    <>
        <section className="landing__page">
            <div className="landing__page-circle">

            </div>
            <div className="landing__page-container">
                <div className="landing__page-image">
                    <img src={background} alt="" />
                </div>
                <div className="landing__page-start">
                    <div className="landing__page-content">
                        <div className="content__header">
                            <h2>When passion meets opportunity; there you find Rahisisha</h2>
                        </div>
                        <div className="content__body">
                            <p>
                                The aim of Rahisisha is to reduce the journey of Young Africans to get job opportunities while providing companies with a pool of skilled and ambitious talent
                            </p>
                        </div>
                    </div>
                    <div className="landing__page-button">
                        <button className="landing-btn">Get Started</button>
                    </div>
                </div>
            </div>
            <div className="landing__page-connections">
                <div className="connections__page-header">
                    <h3>Trusted By More Than 100+ companies</h3>
                </div>
                <div className="connections__page-holder">
                    <div className="connections__image">
                        <img src={connect1} alt="" />
                    </div>
                    <div className="connections__image">
                        <img src={connect2} alt="" />
                    </div>
                    <div className="connections__image">
                        <img src={connect3} alt="" />
                    </div>
                    <div className="connections__image">
                        <img src={connect4} alt="" />
                    </div>
                    <div className="connections__image">
                        <img src={connect5} alt="" />
                    </div>
                    <div className="connections__image">
                        <img src={connect6} alt="" />
                    </div>
                </div>
            </div>
        </section>
        <Footer/>
    </>
  )
}

export default Landing