import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { logout } from "../../redux/actions/authAction";
import { logoutpost } from "../../redux/actions/postActions";

const NavDash = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const logoutf = () => {
    dispatch(logout());
    dispatch(logoutpost());
  };
  return (
    <nav style={{ marginRight: "100px" }}>
      <div>
        <div className="logo">
          <Link exact to="/dashboard">
            <div>
              <h3>Travel Blog</h3>
            </div>
          </Link>
        </div>
        <div className="username">
          <Link exact to="/profile">
            <h5>{user.name +' '+ user.lastName}</h5>
          </Link>
        </div>
        <div className="Out">
          <NavLink to="/" exact activeClassName="active-left-nav">
            <button onClick={logoutf} >
              <ExitToAppIcon />
            </button>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavDash;
