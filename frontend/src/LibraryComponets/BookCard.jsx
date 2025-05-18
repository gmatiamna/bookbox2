import React from 'react';
import PropTypes from "prop-types";
import StarRate from "../components/StarRate";
import AddToCartButton from '../buttons/AddToCartButton';
import LikeButton from '../buttons/ButtonLike';
import { Link } from 'react-router-dom';


const BookCard = ({ book ,userId}) => {
 
  const rating = book.noteMoyenne;
  const roundedRating = Math.round(rating);

  return (
    <div className="w-[100%] h-[407px] bg-white shadow-[0px_8px_32px_0px_rgba(0,0,0,0.25)] rounded-[10px] border border-solid p-2 flex flex-col">
      <div>
        <Link to={`/book/${book._id}`}>
          <img
            src={book.imageCouverture}
            alt={book.titre}
            className="w-[97%] h-[285px] object-cover mx-auto"
          />
        </Link>
        <span className="text-[#6A7282] text-[14px] font-[Zain] font-normal px-4 block">
          {book.categorie}
        </span>

        <h2 className="ml-4 text-[16px] font-[Zain] font-bold text-black leading-5">
          {book.titre}
        </h2>

        <div className='flex justify-between'>
          <div className="flex gap-[3px] ml-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <StarRate
                key={index}
                size={20}
                fill={index < roundedRating ? "#FACC15" : "#E5E7EB"}
              />
            ))}
          </div>

          <p className="ml-4 text-[#000000] font-[Zain] text-[16px] font-bold">
            {book.prix_achat}DT
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        <LikeButton bookId={book._id} userId={userId} />
        <AddToCartButton bookId={book._id} />
      </div>
    </div>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imageCouverture: PropTypes.string.isRequired,
    titre: PropTypes.string.isRequired,
    auteur: PropTypes.string.isRequired,
    noteMoyenne: PropTypes.number.isRequired,
    prix_achat: PropTypes.number.isRequired,
    categorie: PropTypes.string.isRequired,
  }).isRequired,
};

export default BookCard;
