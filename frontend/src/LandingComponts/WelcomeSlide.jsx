// WelcomSlide.jsx
import React, { useState } from "react";
import book1 from "../assets/book1.png";
import book2 from "../assets/book2.png";
import book3 from "../assets/book3.png";
import fishIcon from "../assets/fish.png";
import BooksSlider from "./BookSlider";

const WelcomSlide = () => {
  const [showSlider, setShowSlider] = useState(true);

  const toggleSlider = () => {
    setShowSlider(!showSlider);
  };

  return (
    <div className="w-[92%] mx-auto rounded-xl overflow-hidden shadow-lg border border-[#e5e7eb] mt-4 relative">
      {/* Welcome Section */}
      <div className="relative bg-[#CCDC3F] p-6 flex justify-around items-center overflow-hidden rounded-t-xl">
        <div className="relative w-[120px] h-[170px] group">
          <img
            src={book3}
            alt="Book 3"
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 z-30 group-hover:z-50 hover:-translate-y-4 hover:scale-105"
          />
          <img
            src={book2}
            alt="Book 2"
            className="absolute top-1 left-[50px] w-[95%] h-[95%] object-cover transition-transform duration-300 z-20 group-hover:z-50 hover:-translate-y-4 hover:scale-105"
          />
          <img
            src={book1}
            alt="Book 1"
            className="absolute top-2 left-[100px] w-[90%] h-[90%] object-cover transition-transform duration-300 z-10 group-hover:z-50 hover:-translate-y-4 hover:scale-105"
          />
        </div>

        <div className="max-w-xl">
          <h1 className="font-zain font-bold text-[32px] text-[#525E16]">Welcome to BookBox</h1>
          <p className="font-zain text-[24px] text-[#525E16]">
            Where stories find their readers.
            <br />
            Your journey starts here with a reading experience tailored to your taste.
            <br />
            Discover stories youll love, all in one place.
          </p>
        </div>

        <button
          onClick={toggleSlider}
          className="absolute w-[63px] h-[143px] rounded-[50px] right-[0] -bottom-[100px] bg-[radial-gradient(123.08%_123.08%_at_133.57%_35.71%,#677615_0%,#9FB11D_100%)] shadow-md"
          title="Toggle Library"
        >
          <img src={fishIcon} alt="Toggle Slider" className="absolute top-2 left-6" />
        </button>
      </div>

      {/* Book Slider */}
      {showSlider && <BooksSlider />}
    </div>
  );
};

export default WelcomSlide;
