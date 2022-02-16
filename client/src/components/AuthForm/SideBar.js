import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NotificationsIcon from "@material-ui/icons/Notifications";
import GroupIcon from "@material-ui/icons/Group";
import { Avatar } from "@material-ui/core";
const LeftNav = () => {
  const user = useSelector((state) => state.authReducer.user);
  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <Link to="/profile" exact activeClassName="active-left-nav">
            <Avatar alt="Remy Sharp" src={`/${user.picture}`} />
          </Link>


        </div>
      </div>
    </div>
  );
};

export default LeftNav;
