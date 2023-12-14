import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideNavBar = () => {
  const [open, setOpen] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const Menus = [
    { title: "Dashboard", src: "Chart_fill", link: "" },
    { title: "User", src: "Chat", link: "/user" },
    { title: "Inventor", src: "User", link: "/Product" },
    { title: "Search", src: "Search", link: "/search" }, // Corrected link
    { title: "Customer", src: "Chart", link: "/Customer" },
    { title: "Seller", src: "Chart", link: "/Seller" },
  ];

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src="../../assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
			 border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          alt=""
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={require("../../assets/logo.png").default} // Adjusted image source
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
            alt=""
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Designer
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
				${index === activeTab && "bg-light-white"}`}
              onClick={() => handleTabClick(index)}
            >
              <Link to={Menu.link}>
                <img src={require(`../../assets/${Menu.src}.png`).default} alt="" /> {/* Adjusted image source */}
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {Menu.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideNavBar;