import React from "react";
import StarIcon from "../components/StarRate";

const CustomsReviews = ({ noteMoyenne }) => {
    console.log("noteMoyenne:", noteMoyenne);
  if (noteMoyenne === undefined || noteMoyenne === null) {
    return (
      <div className="bg-white p-4 rounded-[16px] shadow-md border-2 border-slate-300 w-[729px] text-center">
        <h1 className="text-[32px] font-extrabold leading-[100%] tracking-[0px] text-center align-middle text-black font-zain mb-4">
          Customer Reviews
        </h1>
        <p className="text-gray-700 text-sm">No ratings available yet.</p>
      </div>
    );
  }

  let reviewMessage = "";

  if (noteMoyenne <= 2) {
    reviewMessage =
      "This book received mostly negative feedback. Readers found it lacking in consistency or depth.";
  } else if (noteMoyenne === 3) {
    reviewMessage =
      "Reactions to this book are mixed. While it has its strengths and appeals to some, others felt it lacked consistency or depth.";
  } else {
    reviewMessage =
      "The book received generally positive feedback and was well received by readers.";
  }

  const filledStars = Math.floor(noteMoyenne);
  const hasHalfStar = noteMoyenne - filledStars >= 0.5;

  return (
    <div className="bg-white p-4 rounded-[16px] shadow-md border-2 border-slate-300 w-[729px]">
     
      <div className="flex justify-between gap-6 items-start">
        {/* Left Section */}
        <div className="flex-1">
          <h2 className="font-zain font-extrabold text-[24px] leading-[100%] text-center align-middle text-black mb-2">
            Rating Information
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed text-center">{reviewMessage}</p>
        </div>

        {/* Right Section */}
        <div className="text-center min-w-[120px]">
          <p className="text-3xl font-bold text-black">{noteMoyenne.toFixed(1)}</p>
          <div className="flex justify-center mt-1">
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon
                key={i}
                size={22}
                fill={
                  i < filledStars
                    ? "#FACC15"
                    : hasHalfStar && i === filledStars
                    ? "#FDE68A"
                    : "white"
                }
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">out of 5</p>
        </div>
      </div>
    </div>
  );
};

export default CustomsReviews;
