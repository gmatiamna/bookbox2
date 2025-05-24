import React from "react";
import PropTypes from "prop-types";
import AddToCartButton from "../buttons/AddToCartButton";
import RentBookButton from "../buttons/REntSubButton";
import { Link } from "react-router-dom";
import { useCheckActiveSubscriptionQuery } from "../slices/subscriptionApi";

const HomeBookCard = ({ image, title, price, book }) => {
  const { data, isLoading, isError } = useCheckActiveSubscriptionQuery();

  const hasActiveSubscription = data?.hasActiveSubscription;

  return (
    <div className="relative w-[180px] h-[185px] border border-[#62748E] rounded-[15px] overflow-hidden group">
      <Link to={`/book/${book._id}`}>
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </Link>

      <div className="absolute bottom-0 bg-[#F1F5F9] w-full pt-2">
        <h3 className="text-sm font-semibold text-center">{title}</h3>
        <div className="flex justify-around items-center pb-2">
          {isLoading ? (
            <div className="text-sm text-gray-500">Loading...</div>
          ) : isError ? (
            <AddToCartButton bookId={book._id} className="bg-[#C5922D] w-[83px] rounded-[4px]" />
          ) : hasActiveSubscription ? (
            <RentBookButton bookId={book._id}  />
          ) : (
            <AddToCartButton bookId={book._id} className="bg-[#C5922D] w-[83px] rounded-[4px]" />
          )}
          <p className="text-sm font-medium mt-2">${price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

HomeBookCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  book: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default HomeBookCard;
