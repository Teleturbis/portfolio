import React from "react";
import { NavLink } from "react-router-dom";

export default function Header({ user }) {
  return (
    <div className="header-div">
      <div className="header-navlink-div">
        <NavLink to="/" className="header-navlink">
          Home
        </NavLink>
        <NavLink to="/aboutme" className="header-navlink">
          About Me
        </NavLink>
        <NavLink to="/projects" className="header-navlink">
          Projects
        </NavLink>
        <NavLink to="/resume" className="header-navlink">
          Resume
        </NavLink>
        <NavLink to="/user/" className="header-navlink">
          {user.loggedIn ? user.username : "Login"}
        </NavLink>
      </div>
    </div>
  );
}
