import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-black" style={{padding: '10px'}}>
      <div className="container-fluid" style={{width: '86%'}}>
        <Link className="navbar-brand" to="/" style={{color: 'white', fontSize: '1.4rem', fontWeight:"bolder", fontFamily:"sans-serif"}}>RAHISISHA</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0" style={{fontSize: '1.5rem'}}>
            <li className="nav-item">
              <Link className="nav-link" to="/signup" style={{color: 'white', fontSize: '1.0rem', fontFamily:"san-serif", fontWeight:"bold"}}>JOIN NOW</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login" style={{color: 'white', fontSize: '1.0rem', fontFamily:"san-serif", fontWeight:"bold"}}>LOGIN</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;