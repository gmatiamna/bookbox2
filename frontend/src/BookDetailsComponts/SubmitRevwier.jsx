import React, { useState } from "react";
import StarRate from "../components/StarRate";
import SubmitButton from "../buttons/SubmitButton";
import StartReadingButton from "../buttons/StartReadingButton";
import { useCheckHasReviewedQuery } from "../slices/bookApi"; // Adjust path if needed

const SubmitRev = ({ user, bookId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hasStartedReading, setHasStartedReading] = useState(false); // Track if user clicked "Start Reading"

  // Query to check if the user has already reviewed the book
  const { data, isLoading, isError, error } = useCheckHasReviewedQuery(
    { bookId, userId: user?._id },
    { skip: !user }
  );

  if (!user) return <div>Loading user...</div>; // Show loading until user is available

  const hasReviewed = data?.hasReviewed;

  if (isLoading) return <div>Checking review status...</div>;
  if (isError) {
    console.error("Review status error:", error);
    return <div>Error checking review status.</div>;
  }

  const handleStartReadingClick = () => {
    setHasStartedReading(true); // Mark the user as having started reading
    console.log("Start Reading clicked:", hasStartedReading); // Debugging log
  };

  console.log("State of hasStartedReading:", hasStartedReading); // Debugging log

  return (
    <div className="relative w-[40%] mx-auto p-4 bg-[#f7e0c2] rounded-xl shadow-md">
      {/* Show blur effect and "Start Reading" button if the user hasn't started reading */}
      {(!hasStartedReading && !hasReviewed) && (
        <div className="absolute inset-0 backdrop-blur-sm bg-black/40 z-10 rounded-xl flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-lg font-semibold mb-4">
            Please finish the book before posting a review.
          </p>
          <StartReadingButton onClick={handleStartReadingClick} />
        </div>
      )}

      {/* Main content for reviews */}
      <div className={`${hasStartedReading || hasReviewed ? "" : "opacity-30 pointer-events-none"}`}>
        <div className="flex items-center gap-3 mb-3">
          <img
            src={user.photo_profil}
            alt={user.nom}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-medium">{user.nom}</span>
        </div>

        {/* Display rating section only if user has started reading and hasn't reviewed */}
        {hasStartedReading && !hasReviewed && (
          <div className="mb-3">
            <StarRate rating={rating} onRatingChange={setRating} />
          </div>
        )}

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
            disabled={!comment || (!hasStartedReading && !rating)}
            onClick={() => {
              // handle review submit
              console.log("Submitting review:", { rating, comment });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SubmitRev;
