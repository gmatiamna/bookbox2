import React from 'react';
import PropTypes from 'prop-types';
import "../styles/DealBookCardStyle.css";
import StarIcon from "../components/StarRate"
import { Link } from 'react-router-dom';
const DealBook = ({ book }) => {
  const originalPrice = book.prix_achat;
  const discountedPrice = book.discountedPrice;
  const discountRate = Math.round((1 - discountedPrice / originalPrice) * 100);
  const rating = book.noteMoyenne;
  const roundedRating = Math.round(rating);
  return (
    <div>
      <div className="card">
      <div className="w-[97%] h-[97%] object-cover rounded relative">
      <Link to={`/book/${book._id}`}>
        <img
        src={book.imageCouverture}
        alt={book.titre}
        className="w-[100%] h-[100%] "
      />
</Link>
      <span className="absolute top-8 left-[1px] w-[82px] h-[29px] bg-[#9FB11D] text-white text-[16px] leading-[100%] font-zain font-bold rounded-tr-[8px] rounded-br-[8px] flex items-center justify-center">
        {discountRate}% OFF
      </span></div>
      
    </div>
    <div className="flex gap-[7px] ml-10 mt-6">
  {Array.from({ length: 5 }).map((_, index) => (
    <StarIcon
      key={index}
      fill={index < roundedRating ? "#FACC15" : "#FFFFFF"} // Yellow if filled
      size={25}
    />
  ))}
</div>

    </div>
    
  );
};

DealBook.propTypes = {
  book: PropTypes.object.isRequired,
};

export default DealBook;
