import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
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
      </div>
    </div>
  );
}
