import React, { useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Nav.css";


const Navbar = () => {
  const location = useLocation();
  const indicatorRef = useRef(null);
  useEffect(() => {
    const activeTab = document.querySelector(".nav-item.active");
    if (activeTab) {
      const { offsetLeft, clientWidth } = activeTab;
      indicatorRef.current.style.width = `${clientWidth}px`;
      indicatorRef.current.style.left = `${offsetLeft}px`;
      indicatorRef.current.style.transition = "left 0.3s ease, width 0.3s ease";
    }
  }, [location]);

  return (
    <div className="relative w-full flex justify-center items-center bg-transparent text-[#724521]">
      <div className="flex space-x-6">
        <NavLink
          to="/home"
          exact="true"
          className="nav-item nav-link"
          activeclassname="active"
        >
          <span className="nav-text relative">Home</span>
        </NavLink>
        <NavLink
          to="/library"
          exact="true"
          className="nav-item nav-link"
          activeclassname="active"
        >
          <span className="nav-text relative">Library</span>
        </NavLink>
        <NavLink
          to="/services"
          exact="true"
          className="nav-item nav-link"
          activeclassname="active"
        >
          <span className="nav-text relative">Services</span>
        </NavLink>
        <NavLink
          to="/offers"
          exact="true"
          className="nav-item nav-link"
          activeclassname="active"
        >
          <span className="nav-text relative">Offers</span>
        </NavLink>
      </div>

      <div className="absolute bottom-0 w-full">
        <div ref={indicatorRef} ></div>
      </div>
    </div>
  );
};

export default Navbar;
