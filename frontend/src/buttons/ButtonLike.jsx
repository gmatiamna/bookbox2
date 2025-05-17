import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAddToLikedBooksMutation, useGetBookByIdQuery } from '../slices/bookApi';
import { setLikedBook, setLikesCount, selectLikedBook, selectLikesCount } from '../slices/bookSlice';
import PropTypes from "prop-types";
import "../styles/Likebutton.css";

const LikeButton = ({ bookId }) => {
  const dispatch = useDispatch();

  // Getting liked status and likes count from Redux
  const liked = useSelector((state) => selectLikedBook(state, bookId));
  const likes = useSelector((state) => selectLikesCount(state, bookId));

  const { data: book, isLoading, isError } = useGetBookByIdQuery(bookId);
  const [likeBook] = useAddToLikedBooksMutation();

  const userId = useSelector((state) => state.auth.user?._id);  // Assuming you have a user in your store

  // Sync the Redux state with the book's data on component mount or when book data changes
  useEffect(() => {
    if (book && userId) {
      const userHasLiked = book.likedBy.includes(userId);
      // Update Redux state with like status and like count from the book data
      dispatch(setLikedBook({ bookId, liked: userHasLiked }));
      dispatch(setLikesCount({ bookId, likes: book.likedBy.length }));
    }
  }, [book, userId, dispatch, bookId]);

  // Handle the like/unlike action
  const handleLike = async () => {
    try {
      const response = await likeBook(bookId).unwrap();
      const updatedLiked = response.liked;
      const updatedLikes = response.likes;

      // Dispatch the updated like status and likes count to Redux
      dispatch(setLikedBook({ bookId, liked: updatedLiked }));
      dispatch(setLikesCount({ bookId, likes: updatedLikes }));
    } catch (err) {
      console.error('Failed to like/unlike the book:', err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading book data</div>;

  return (
    <div className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLike}>
      <div className="like">
        <svg
          className="like-icon"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
        </svg>
        <span className="like-text">Likes</span>
      </div>
      <span className="like-count">{likes}</span>
    </div>
  );
};

LikeButton.propTypes = {
  bookId: PropTypes.string.isRequired, // Define the expected type of bookId
};

export default LikeButton;
