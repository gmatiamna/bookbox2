import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ByuNowstyle.css';
import { useAddToCartMutation } from '../slices/cartApi';

const BuyNowButton = ({ price, className = '', label = 'Buy Now', bookId, type = 'achat', quantity = 1 }) => {
  const [addToCart, { isLoading }] = useAddToCartMutation();

  const handleClick = async () => {
    try {
      await addToCart({
        bookId,
        type,
        quantity,
        prix: price,
      }).unwrap();
      console.log(`${label} — added to cart successfully`);
    } catch (err) {
      console.error(`Failed to add to cart (${label}):`, err);
    }
  };

  return (
    <div
      data-tooltip={`Price: $${price}`}
      className={`button ${className}`}
      onClick={handleClick}
      disabled={isLoading}
      role="button"
    >
      <div className="button-wrapper">
        <div className="text">{isLoading ? 'Adding...' : label}</div>
        <span className="icon">
          <svg viewBox="0 0 16 16" className="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
          </svg>
        </span>
      </div>
    </div>
  );
};

BuyNowButton.propTypes = {
  price: PropTypes.number.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  bookId: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['achat', 'location']).isRequired,
  quantity: PropTypes.number,
};

export default BuyNowButton;
