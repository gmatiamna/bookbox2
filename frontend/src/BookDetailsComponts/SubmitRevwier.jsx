import React, { useState } from "react";
import StarRate from "../components/StarRate";
import SubmitButton from "../buttons/SubmitButton";

const SubmitRev = ({ user}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");


  if (!user) return <div>Loading user...</div>;



  return (
    <div className="w-[40%] mx-auto p-4 bg-[#f7e0c2] rounded-xl shadow-md">
      {/* Main content for reviews.   */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <img
            src={user.photo_profil}
            alt={user.nom}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-medium">{user.nom}</span>
        </div>

        {/* Display rating section  */}
        <div className="mb-3">
          <StarRate rating={rating} onRatingChange={setRating} />
        </div>

        {/* Input for comment */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your thoughts about the book..."
          rows="4"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-600 resize-none"
        />

        {/* Submit button */}
        <div className="mt-4">
          <SubmitButton
            disabled={!comment}
            onClick={() => {
              // handle review submit
              console.log("Submitting review:", { rating, comment });
              // In a real app, you'd send this data to your backend.
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SubmitRev;
