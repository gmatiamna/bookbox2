import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Nav from "../components/nav";


const Wishlist = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    return <Navigate to="/login" />;
  }
 
  return (
    <div className="w-full">
      <Nav />
 
      
    
    </div>
  );
};

export default Wishlist;

