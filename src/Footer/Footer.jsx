import React from 'react'
import './footer.css'
import flag1 from '../Assets/flag1.jpg'
import flag2 from '../Assets/flag2.png'
import flag3 from '../Assets/flag3.png'
import flag4 from '../Assets/flag4.png'


function Footer() {
  return (
    <>
    <section className="footer__section">
        <footer className="footer__container">
            <div className="footer__container-logo">
                <div className="footer__logo">
                    <h2>Rahisisha</h2>
                </div>
                <div className="footer__motto">
                    <h4>Develop Your Career With Us</h4>
                </div>
            </div>
            <div className="footer__container-contact">
                <div className="contact__us-header">
                    <h4>Contact us:</h4>
                </div>
                <div className="contact__rahisisha">
                    <h5>Telephone:</h5>
                    <h5>+254795107488</h5>
                </div>
                <div className="contact__rahisisha">
                    <h5>Email:</h5>
                    <h5>rahisisha@gmail.com</h5>
                </div>
                <div className="contact__rahisisha">
                    <h5>Facebook:</h5>
                    <h5>@rahisisha</h5>
                </div>
            </div>
            <div className="footer__location">
                <div className="footer__location-header">
                    <h4>Available in</h4>
                </div>
                <div className="footer__location-region">
                    <div className="footer__location-area">
                        <h5>Kenya</h5>
                    </div>
                    <div className="footer__location-flag">
                        <img src={flag1} alt="" />
                    </div>
                </div>
                <div className="footer__location-region">
                    <div className="footer__location-area">
                        <h5>Uganda</h5>
                    </div>
                    <div className="footer__location-flag">
                        <img src={flag2} alt="" />
                    </div>
                </div>
                <div className="footer__location-region">
                    <div className="footer__location-area">
                        <h5>Tanzania</h5>
                    </div>
                    <div className="footer__location-flag">
                        <img src={flag3} alt="" />
                    </div>
                </div>
                <div className="footer__location-region">
                    <div className="footer__location-area">
                        <h5>South Africa</h5>
                    </div>
                    <div className="footer__location-flag">
                        <img src={flag4} alt="" />
                    </div>
                </div>
            </div>
        </footer>
        <div className="footer__copyright">
                <small>
                    2023 Rahisisha &copy; All Rights Reserved
                </small>
        </div>
    </section>
    </>
  )
}

export default Footer