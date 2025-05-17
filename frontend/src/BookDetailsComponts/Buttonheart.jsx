import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useAddToLikedBooksMutation, useRemoveFromLikedBooksMutation } from '../slices/bookApi';
import { setLikedBook, setLikesCount, selectLikedBook, selectLikesCount } from '../slices/bookSlice';

const HeartButton = ({ bookId }) => {
  const dispatch = useDispatch();

  const likedBook = useSelector((state) => selectLikedBook(state, bookId));  // Get liked status from Redux
  const likesCount = useSelector((state) => selectLikesCount(state, bookId));  // Get likes count from Redux

  const [addToLikedBooks] = useAddToLikedBooksMutation();
  const [removeFromLikedBooks] = useRemoveFromLikedBooksMutation();

  const handleLike = async () => {
    if (likedBook) {
      // If the book is already liked, we want to remove the like
      try {
        await removeFromLikedBooks(bookId).unwrap();
        dispatch(setLikedBook({ bookId, liked: false }));
        dispatch(setLikesCount({ bookId, likes: likesCount - 1 })); // Decrement the likes count
      } catch (error) {
        // Handle error
        console.error("Error unliking the book:", error);
      }
    } else {
      // If the book is not liked, we want to add the like
      try {
        await addToLikedBooks(bookId).unwrap();
        dispatch(setLikedBook({ bookId, liked: true }));
        dispatch(setLikesCount({ bookId, likes: likesCount + 1 })); // Increment the likes count
      } catch (error) {
        // Handle error
        console.error("Error liking the book:", error);
      }
    }
  };

  // Set the heart color based on the liked status
  const heartColor = likedBook ? '#FF3B3B' : '#00BAC7';
  const rectStroke = likedBook ? '#00BAC7' : '#F6F6F6';
  const backgroundFill = likedBook ? '#E6F9FA' : 'none';

  return (
    <div onClick={handleLike} style={{ cursor: 'pointer' }} title={likedBook ? 'Unlike' : 'Like'}>
      <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="1"
          y="1"
          width="41"
          height="41"
          rx="7"
          stroke={rectStroke}
          strokeWidth="2"
          fill={backgroundFill}
        />
        <g transform="translate(13, 14)">
          <path
            d="M8.49392 15C8.11668 15 7.73336 14.853 7.44739 14.5651L1.45419 8.53205C0.51718 7.58881 0 6.3332 0 4.99796C0 3.66272 0.51718 2.4071 1.45419 1.46386C2.3912 0.52062 3.63851 0 4.96492 0C6.29134 0 7.53257 0.520621 8.46958 1.45774L8.47566 1.46386C8.47566 1.46386 8.48783 1.47611 8.5 1.47611C8.51217 1.47611 8.51825 1.46999 8.52434 1.46386C9.46135 0.52062 10.7087 0 12.0351 0C13.3615 0 14.6088 0.52062 15.5458 1.46386C16.4828 2.4071 17 3.65659 17 4.99796C17 6.33932 16.4828 7.58881 15.5458 8.53205L15.0104 9.07105L9.55261 14.5651C9.25447 14.853 8.87115 15 8.49392 15ZM8.46958 13.53C8.48175 13.5423 8.50608 13.5423 8.51825 13.53L13.976 8.03593L14.5115 7.49694C15.1747 6.82932 15.5397 5.9412 15.5397 4.99796C15.5397 4.05472 15.1747 3.1666 14.5115 2.49898C13.8482 1.83136 12.966 1.46386 12.029 1.46386C11.092 1.46386 10.2097 1.83136 9.54653 2.49898C9.26664 2.78073 8.89549 2.93998 8.5 2.93998C8.10451 2.93998 7.73336 2.78685 7.45347 2.5051L7.44739 2.49898C6.78418 1.83136 5.90193 1.46386 4.96492 1.46386C4.02792 1.46386 3.14567 1.83136 2.48246 2.49898C1.81926 3.1666 1.45419 4.05472 1.45419 4.99796C1.45419 5.9412 1.81926 6.82932 2.48246 7.49694L8.46958 13.53Z"
            fill={heartColor}
          />
        </g>
      </svg>
    
    </div>
  );
};

HeartButton.propTypes = {
  bookId: PropTypes.string.isRequired,
};

export default HeartButton;
