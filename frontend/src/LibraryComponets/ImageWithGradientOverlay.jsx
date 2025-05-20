import React from 'react';
import libraryBg from '../assets/library 1.svg';
import ExploreButton from "../buttons/ExploreButton";
import BookLibrary from './BookLibrary';
import { useGetBooksQuery } from '../slices/bookApi';
import librarybook from "../assets/librarybook c.png";

const ImageWithGradientOverlay = () => {
  const { data: books = [], isLoading, error } = useGetBooksQuery();

  // Utility function to shuffle an array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Get 3 random books
  const randomBooks = shuffleArray(books).slice(0, 3);

  return (
    <>
      <div className="relative w-[90%] h-[406px] top-[134px] left-[32px] rounded-[20px] overflow-hidden mx-auto">
        <img src={libraryBg} alt="Library Background" className="absolute w-full h-full object-cover" />
        <div className="absolute w-full h-full bg-gradient-to-r from-black/50 to-transparent" />

        <div className="relative z-10 w-full h-full flex items-center justify-between px-16">
          <div className="grid gap- max-w-[60%]">
            <h1 className="font-[Zain] font-bold text-[52px] text-[#D5A83A] shadow-[4px_4px_20px_#FFFFFF33]">
              A Universe of Stories
            </h1>
            <h2 className="font-[Zain] font-bold text-[40px] text-[#00BDB0] shadow-[4px_4px_20px_#FFFFFF33]">
              at Your Fingertips
            </h2>
            <p className="font-[Zain] font-normal text-[24px] text-white">
              Browse, discover, and dive into thousands of books.<br />
              Your next favorite story is just a click away — <br />
              explore categories, new releases, and timeless classics, all in one place.
            </p>
            <ExploreButton label={"Explore"} />
          </div>

          <div className="w-[230px] h-[308px] shadow-[-4px_4px_16px_0px_rgba(0,0,0,0.25)] rounded-[10px] overflow-hidden">
            <img
              src={librarybook}
              alt="Book Cover"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="w-[45%] mx-auto mt-24 flex justify-around">
        {isLoading && <p className="text-white">Loading books...</p>}
        {error && <p className="text-red-500">Failed to load books</p>}
        {!isLoading && !error &&
          randomBooks.map((book) => (
            <BookLibrary key={book._id} book={book} />
          ))}
      </div>
    </>
  );
};

export default ImageWithGradientOverlay;
