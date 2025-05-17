import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Nav from "../components/nav";
import OffersTitle from "../OffersCompants/OffersTtile";
const Offers= () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Nav />
    <OffersTitle/>
      
    </div>
  );
};

export default Offers;
