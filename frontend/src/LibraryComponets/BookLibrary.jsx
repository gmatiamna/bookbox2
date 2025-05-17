import React from 'react';
import PropTypes from 'prop-types';
import BuyNowButton from '../buttons/BuyNowButton';
import { Link } from 'react-router-dom';
const BookLibrary = ({ book }) => (
  <div>
    <div className="w-[200px] h-[285px] rounded-[10px] shadow-[4px_8px_32px_0px_rgba(0,0,0,0.4)] overflow-hidden relative">
    <Link to={`/book/${book._id}`}> 
      <img src={book.imageCouverture} alt={book.titre} className="w-full object-cover" />
</Link>
      <div className="absolute w-[30%] h-[18px] top-[6px] left-[8px] rounded-[20px] bg-white/10 text-white text-[10px] px-2 py-[2px] backdrop-blur-md flex items-center justify-center">
        <span>{book.prix_achat} DT</span>
      </div>

      <div className="absolute w-[30%] h-[18px] top-[6px] right-[8px] rounded-[20px] bg-[#9FB11D] text-white text-[10px] px-2 py-[2px] backdrop-blur-md flex items-center justify-center">
        {book.noteMoyenne}/10
      </div>



<BuyNowButton
   bookId={book._id}
   price={book.prix_achat}
  label="Buy Now"
  className="absolute bottom-0 -right-[5px] bg-[#D5A83A]  font-[Zain] font-400 text-[16px]"
/>
    </div>

    <div className="text-center w-[200px] font-[Zain] font-bold text-[24px] leading-[100%] tracking-[0%] text-black h-[34px] mt-4 px-2">
      {book.titre}
    </div>
  </div>
);

BookLibrary.propTypes = {
  book: PropTypes.shape({
    titre: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    prix_achat: PropTypes.number.isRequired,
    prix_location: PropTypes.number.isRequired,
    noteMoyenne: PropTypes.number,
    imageCouverture: PropTypes.string.isRequired,
  }).isRequired,
};

export default BookLibrary;
