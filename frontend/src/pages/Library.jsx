import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Nav from "../components/nav";
import ImageWithGradientOverlay from "../LibraryComponets/ImageWithGradientOverlay";
import DealBookList from "../LibraryComponets/DealBookList";
import BookShow from "../LibraryComponets/BooksShow";

const Library = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  const userId = userInfo?.user?.id;


  return (
    <div>
      <Nav />
      <ImageWithGradientOverlay />
      <DealBookList />
      {userId && <BookShow userId={userId} />} {/* Only render BookShow if userId exists */}
    </div>
  );
};

export default Library;