import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Nav from "../components/nav";

import ServicesSlider from "../ServisesCompontes/ServisesSider";
const Services = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    return <Navigate to="/login" />;
  }
 
  return (
    <div className="w-full">
      <Nav />
 
      <ServicesSlider/>
    
    </div>
  );
};

export default Services;

