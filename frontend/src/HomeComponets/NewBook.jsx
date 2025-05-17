import React from "react";
import { useGetNewFavoriteBooksQuery } from "../slices/bookApi";
import ExploreButton from "../buttons/ExploreButton";
import { Link } from "react-router-dom";
const NewBooks = () => {
  const { data: books, isLoading, isError, error } = useGetNewFavoriteBooksQuery();

  if (isLoading) {
    return (
      <div className="w-[80%] rounded-[20px] bg-[#F1F5F9] mt-10 p-8 mx-auto">
        <p>Loading new books...</p>
        {/* Optional: Add a spinner or loading animation */}
      </div>
    );
  }

  if (isError) {
    console.error('Error:', error); // Log the full error object for debugging
    return (
      <div className="w-[80%] rounded-[20px] bg-[#F1F5F9] mt-10 p-8 mx-auto">
        <p>Failed to load new books: {error.message || "Unknown error"}</p>
      </div>
    );
  }

  return (
    <div className="w-[80%] rounded-[20px] bg-[#F1F5F9] mt-10 p-8 mx-auto flex justify-between">
      <div> <h2 className="text-[52px] leading-[100%] font-zain font-extrabold text-[#9FB11D] mt-8 ml-10">
        New Books
      </h2>
      <h3 className="text-[30px] leading-[100%] font-zain font-bold text-[#C5922D] ml-10">
        in Your Favorite Categories
      </h3>

      <p className="text-[28px] leading-[100%] font-zain font-bold mt-8 ml-10">
        Fresh arrivals from the genres you love most.
        <br />
        Discover new stories that match your passions and keep your shelf
        growing.
      </p>

      <ExploreButton
        className="w-[120px] bg-[#9FB11D] text-white ml-10 mt-8"
        label="Explore"
      />
</div>
     
      <div >
        {books?.map((book) => (
          <div key={book._id} className="">
             <Link to={`/book/${book._id}`}>  <img
              src={book.imageCouverture || '/default-cover.jpg'} // Add fallback image here
              alt={book.titre}
              className="w-[100%] h-[250px]  rounded-md mb-4"
            />
           </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewBooks;
