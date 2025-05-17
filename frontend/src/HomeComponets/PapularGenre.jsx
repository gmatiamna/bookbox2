import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";
import GenreCard from "./GenreCard";
const getRandomGenres = (allGenres, count = 6) => {
        const shuffled = [...allGenres].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
      };
const PapularGenre = () => {
    
      
  
        const { userInfo } = useSelector((state) => state.auth);
        const [genres, setGenres] = useState([]);
      
        useEffect(() => {
          // Check if the user is authenticated
          if (!userInfo) {
            return <Navigate to="/login" />;
          }
      
          // Fetch genres from the API
          const fetchGenres = async () => {
            try {
              const response = await axios.get("http://localhost:5000/api/user/genres");   // Make GET request to fetch genres
              const random = getRandomGenres(response.data);  // Get random genres
              setGenres(random);  // Set genres in the state
            } catch (err) {
              console.error("Failed to fetch genres:", err);  // Log any errors
            }
          };
      
          fetchGenres();  // Call the function to fetch genres
        }, [userInfo]);

  return (
    <div className="w-[90%] mx-auto px-4 mt-12">
    <h2 className="text-[20px]  leading-[100%] tracking-[0] font-zain text-[#A1A1A1] mb-6">
    Popular Category</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 ">
      {genres.map((genre) => (
        <GenreCard key={genre.name} name={genre.name} svg={genre.svg} />
      ))}
    </div>
    </div>
  );
};


export default PapularGenre;
