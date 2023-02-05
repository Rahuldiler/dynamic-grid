import React from "react";
import { NavLink } from "react-router-dom";

const Links = ({ icon, text, route }) => {
  return (
    <NavLink to={route} className="sidebar__links">
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </NavLink>
  );
};

export default Links;
