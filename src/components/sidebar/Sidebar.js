import React, { useState } from "react";
import "../../styles/sidebar.scss";
import Links from "./Links";
import UserImg from "../../assets/images/profile.jpg";
import { AiOutlineCloseCircle, AiOutlineMenu } from "react-icons/ai";
import { LinksArray } from "./linksArray";

const Sidebar = () => {
  const [openSidebar, setopenSidebar] = useState(false);
  return (
    <>
      <AiOutlineMenu
        className="open__menu__icon"
        onClick={() => setopenSidebar(true)}
      />
      <div className={`sidebar__main  ${openSidebar ? "sidebarActive" : ""}`}>
        <div className="profile__user__logo">
          <div className="user_detail">
            <span className="pro__pic">
              <img src={UserImg} alt="user__img" />
            </span>
            <span className="user__name">WOW</span>
          </div>
          <div className="icon">
            <AiOutlineCloseCircle onClick={() => setopenSidebar(false)} />
          </div>
        </div>
        {LinksArray.map((link, id) => (
          <Links
            key={id}
            icon={link.icon}
            text={link.name}
            route={link.route}
          />
        ))}
      </div>
    </>
  );
};

export default Sidebar;
