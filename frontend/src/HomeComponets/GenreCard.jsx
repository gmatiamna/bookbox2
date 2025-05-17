import React from "react";
import PropTypes from "prop-types";

const GenreCard = ({ name, svg }) => {
  return (
    <div className="flex flex-col items-center text-center bg-F7F9CE p-4 rounded-lg shadow hover:shadow-md transition" style={{ backgroundColor: "#F7F9CE" }}>
      <img
        src={`/genre_icons/${svg}`} // adjust path to your public folder structure
        alt={name}
        className="w-16 h-16 mb-2 text-[#525E16] "
      />
     <p className="text-[28px]  leading-none font-zain text-[#525E16] px-2 py-1 rounded">
  {name}
</p>

    </div>
  );
};
GenreCard.propTypes = {
    name: PropTypes.string.isRequired,
    svg: PropTypes.string.isRequired,
  };
export default GenreCard;
