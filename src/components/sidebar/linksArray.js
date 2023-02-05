import {
    MdSpaceDashboard,
    MdOutlineSpeakerNotes,
    MdOutlineContacts,
    MdLogout,
  } from "react-icons/md";
  import {
    AiOutlineUser,
    AiOutlineSetting,
    AiOutlineAlipayCircle,
  } from "react-icons/ai";

export const LinksArray = [
    {
      icon: <MdSpaceDashboard />,
      name: "Dashboard",
      route: "/",
    },
    {
      icon: <AiOutlineUser />,
      name: "profile",
      route: "/profile",
    },
    {
      icon: <AiOutlineSetting />,
      name: "settings",
      route: "/settings",
    },
    {
      icon: <MdOutlineSpeakerNotes />,
      name: "term & conditions",
      route: "/t__c",
    },
    {
      icon: <MdOutlineContacts />,
      name: "contact us",
      route: "/contact",
    },
    {
      icon: <AiOutlineAlipayCircle />,
      name: "about us",
      route: "/about",
    },
    {
      icon: <MdLogout />,
      name: "log out",
      route: "/logout",
    },
  ];