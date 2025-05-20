import React from "react";
import { useParams } from "react-router-dom";
import { useGetLatestCommentQuery } from "../slices/bookApi";
import StarRate from "../components/StarRate";
import avatarDefault from "../assets/avatar-def.webp"; 
const BookComments = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetLatestCommentQuery(id);

  if (isLoading) return <p>Loading comment...</p>;
  if (isError || !data) return <p>No comments available.</p>;

  const { userName, userPhoto, commentText, rating, date } = data;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div> 
      <h2 className="text-xl font-semibold mb-4">Showing comments and reviews</h2>
       <div className="bg-white p-4 rounded-[16px] shadow-md border-2 border-slate-300 w-[729px]">
     
      <div className="flex gap-4 items-start">
      <img
  src={userPhoto}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = avatarDefault;
  }}
  alt={userName}
  className="w-12 h-12 rounded-full object-cover"
/>

        <div className="flex flex-col flex-grow">
          <div className="flex justify-between">
            <div>
              <p className="font-medium">{userName}</p>
              <p className="text-sm text-gray-500">{formattedDate}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">{rating.toFixed(1)}</span>
              <div className="flex gap-[2px]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarRate
                    key={index}
                    size={16}
                    fill={index < Math.round(rating) ? "#9FB11D" : "#E5E7EB"}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-800">“{commentText}”</p>
        </div>
      </div>
    </div>
    </div>
   
  );
};

export default BookComments;
