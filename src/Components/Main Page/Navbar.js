import React from "react";
import "./navbar.css";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import WorkIcon from "@mui/icons-material/Work";
import TextsmsIcon from "@mui/icons-material/Textsms";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import AppsIcon from "@mui/icons-material/Apps";
import { Link } from "react-router-dom";

function Navbar({ showUp, setshowUp }) {
  // show messages
  const showMessages = () => {
    setshowUp(true);
  };

  return (
    <div className="Navbar fixed top-0 left-0 right-0 z-30 h-[60px]" style={{backgroundColor:"black"}}>
      <div className="logo_section">
        <span style={{color:"white", fontWeight:"bolder"}}>Rahisisha</span>

        {/* <SearchIcon className = 'spair_search'/> */}
       
      </div>
      <div className="nav_section">
        <ul>
          <li className="active">
            <HomeIcon  style={{color:"white"}}/>
            <Link to="/home" style={{color:"white"}} className="nav_text">Home</Link>{" "}
          </li>
          
          <li>
            <WorkIcon style={{color:"white"}} />
            <Link to="/profile" style={{color:"white"}} className="nav_text">Profile</Link>
          </li>
         
          <li>
            <NotificationsIcon style={{color:"white"}} />
            <Link to="/jobs" style={{color:"white"}} className="nav_text">Jobs</Link>
          </li>
          <li>
            <GroupIcon style={{color:"white"}}/>
            <Link  to="/community"   style={{color:"white"}} className="nav_text">Community</Link>
          </li>
          <li>
            {" "}
            <img
              src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
              alt="profile"
            />
            <Link to="/home" style={{color:"white"}} className="nav_text"> Me</Link>
          </li>
          <li className="line"></li>
          <li style={{color:"white"}} className="work">
            <AppsIcon style={{color:"white"}}/> 
            <Link to="/talent" >Talent</Link>

          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
