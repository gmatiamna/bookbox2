import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  useGetGenresQuery } from "../slices/bookApi";
import{useChooseGenresMutation} from "../slices/userApi"
import green from "../assets/choosegenregreen.svg"
import { motion } from "framer-motion";
import SigngreenText from "../SignupComponets/Signupgrentext"
const ChooseGenresPage = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [chooseGenres, { isLoading }] = useChooseGenresMutation();
  const {
    data: genres = [],
    isLoading: loadingGenres,
    isError,
  } = useGetGenresQuery();

  const toggleGenre = (genreName) => {
    setError(""); // Clear error on click
    if (selectedGenres.includes(genreName)) {
      setSelectedGenres((prev) => prev.filter((g) => g !== genreName));
    } else {
      if (selectedGenres.length >= 3) {
        setError("You can select up to 3 genres only.");
        return;
      }
      setSelectedGenres((prev) => [...prev, genreName]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedGenres.length === 0) {
      setError("Please select at least one genre.");
      return;
    }

    try {
      // Send correctly formatted payload
      await chooseGenres({ genre_prefere: selectedGenres }).unwrap();
      alert("Genres saved successfully!");
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError(err?.data?.message || "Failed to save genres.");
    }
  };

  const handleSkip = () => {
    navigate("/home");
  };

  console.log("Selected genres:", selectedGenres);

  if (loadingGenres) return <p>Loading genres...</p>;
  if (isError) return <p>Failed to load genres.</p>;

  return (
    <div className=" w-full relative">
     <motion.img
  src={green}
  alt="Signup Illustration"
  className="absolute top-0 left-0 max-sm:w-full"
  initial={{ opacity: 0, x: -100 }}           // Start 100px to the right
  whileInView={{ opacity: 1, x: 0 }}         // Animate to original position
  transition={{ type: "spring", bounce: 0.4, duration: 2 }}
/>
      <SigngreenText position="top-left" className="opacity-80" />
      <div className="w-[50%] absolute right-0 top-[50px]">
      <h1 className="font-[Zain] font-extrabold text-[52px] leading-[100%] tracking-[0px]   text-[#9FB11D]">
      Select Your Genre
      </h1>
      <h4 className="font-[Zain] font-normal text-[40px] leading-[100%] tracking-[0px]" >What kind of genre do you like?</h4>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {genres.map((genre) => (
            <button
              type="button"
              key={genre.name}
              onClick={() => toggleGenre(genre.name)}
              className={`flex flex-col items-center p-3 transition shadow-[0px_5px_10px_0px_#0000001A] border-[2px] border-[#B5BFD9] rounded-md p-4 ${
                selectedGenres.includes(genre.name)
                  ? "bg-blue-200 border-blue-500"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              <img
                src={`/genre_icons/${genre.svg}`}
                alt={genre.name}
                className="w-16 h-16 object-contain mb-2"
              />
              <span className="text-sm">{genre.name}</span>
            </button>
          ))}
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <div className="mt-6 flex gap-4">
        <button
  type="submit"
  className={`px-8 py-2 rounded-[40px] text-white ${
    selectedGenres.length === 3 && !isLoading
      ? "bg-[#9FB11D] hover:bg-green-700"
      : "bg-[#67761599] cursor-not-allowed"
  }`}
  disabled={selectedGenres.length !== 3 || isLoading}
>
  {isLoading
    ? "Saving..."
    : selectedGenres.length === 3
    ? "Done"
    : "Loading..."}
</button>


          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded-[40px] hover:bg-gray-500"
            onClick={handleSkip}
          >
            Skip
          </button>
        </div>
      </form>
      </div>
      
    </div>
  );
};

export default ChooseGenresPage;
