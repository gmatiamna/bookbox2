import React, { useState } from "react";
import { useAddRatingMutation, useAddCommentMutation } from "../slices/bookApi";
import StarRate from "../components/StarRate";
import Input from "../buttons/SubmitButton";
import avatarDefault from "../assets/avatar-def.webp"; 

const SubmitRev = ({ user, bookId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
 const currentUser = user?.user;
  const [addRating] = useAddRatingMutation();
  const [addComment] = useAddCommentMutation();
console.log("User object:", user);
  const handleSubmit = async () => {
    try {
      if (rating) {
        await addRating({ bookId, rating }).unwrap();
      }

      if (comment.trim()) {
    await addComment({ bookId, texte: comment }).unwrap();

      }


      setRating(0);
      setComment("");
    } catch (err) {
      console.error("Review submission failed:", err);
    }
 
  };

  if (!user) return <div>Loading user...</div>;

  return (
    <div className="w-[40%] mx-auto p-4 bg-[#f7e0c2] rounded-xl shadow-md">
      <div>
        <div className="flex items-center gap-3 mb-3">
        <img
  src={currentUser?.photo_profil || avatarDefault}
  alt=""
  className="w-10 h-10 rounded-full object-cover"
/>

{currentUser ? (
  <span className="font-medium">{currentUser.nom}</span>
) : (
  <span className="font-medium text-gray-500">Anonymous</span>
)}
        </div>

        <div className="rounded-[16px] p-3">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <StarRate
                key={i}
                size={25}
                fill={i <= rating ? "#facc15" : "#e5e7eb"}
                onClick={() => setRating(i)}
              />
            ))}
          </div>
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your thoughts about the book..."
          rows="4"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-600 resize-none"
        />

        <div className="mt-4">
          <Input
            disabled={!rating && !comment}
            onClick={handleSubmit}
            text="Submit Review"
          />
        </div>
      </div>
    </div>
  );
};

export default SubmitRev;
