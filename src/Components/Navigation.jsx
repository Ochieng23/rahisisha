import React from 'react'
import { Link } from 'react-router-dom';


function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-black" style={{padding: '10px'}}>
      <div className="container-fluid" style={{width: '86%'}}>
        <Link className="navbar-brand" to="" style={{color: 'white', fontSize: '1.4rem'}}>RAHISISHA</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0" style={{fontSize: '1.5rem'}}>
            <li className="nav-item">
              <Link className="nav-link" to="/home" style={{color: 'white', fontSize: '1.0rem'}}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile" style={{color: 'white', fontSize: '1.0rem'}}>Profile</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/notification" style={{color: 'white', fontSize: '1.0rem'}}>Notifications</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/community" style={{color: 'white', fontSize: '1.0rem'}}>Community</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/logout" style={{color: 'white', fontSize: '1.2rem'}}>Logout</Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}


export default Navigation