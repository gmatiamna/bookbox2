import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetBookByIdQuery } from "../slices/bookApi";
import { useCheckActiveSubscriptionQuery } from "../slices/subscriptionApi";
import AddToWishlistButton from "../buttons/AddToWishlist";
import AddToCartButton from "../buttons/AddToCartButton";
import RentBookButton from "../buttons/REntSubButton";
import StarRate from "../components/StarRate";
import comment from "../assets/comment.png";
import heart from "../assets/Heart Like.png";
import richa from "../assets/richa.png";
import genreicon from "../assets/genre.png";
import HeartButton from "../BookDetailsComponts/Buttonheart";

const BookDetails = ({ setNoteMoyenne }) => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useGetBookByIdQuery(id);
  const { userInfo } = useSelector((state) => state.auth);
  const { data: subData, isLoading: subLoading, isError: subError } = useCheckActiveSubscriptionQuery();

  const userLikedBooks = userInfo?.likedBooks || [];

  useEffect(() => {
    if (book?.noteMoyenne && setNoteMoyenne) {
      console.log("Setting noteMoyenne to:", book.noteMoyenne);
      setNoteMoyenne(book.noteMoyenne);
    }
  }, [book, setNoteMoyenne]);

  if (isLoading) return <p>Loading book details...</p>;
  if (isError) return <p>Failed to load book details.</p>;
  if (!book) return <p>No book found.</p>;

  const rating = book.noteMoyenne || 0;
  const roundedRating = Math.round(rating);
  const isBookLiked = userLikedBooks.includes(book._id);
  const hasActiveSubscription = subData?.hasActiveSubscription;

  return (
    <div className="w-[90%] mx-auto mt-[120px] px-4 relative">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={book.imageCouverture}
          alt={book.titre}
          className="w-[280px] h-[418px] rounded-[10px] object-cover shadow-md"
        />

        <div className="grid gap-2">
          <h1 className="font-zain font-bold text-[52px] leading-[24px] tracking-[0px] text-black">
            {book.titre}
          </h1>

          <div className="flex gap-4 items-center text-sm text-gray-700">
            <div className="flex gap-[3px] mb-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarRate
                  key={index}
                  size={20}
                  fill={index < roundedRating ? "#9FB11D" : "#E5E7EB"}
                />
              ))}
              {book.nbEvaluations}
            </div>
            <div className="flex gap-4 items-center mb-4 text-sm text-gray-700">
              <img src={comment} alt="" />
              <p>{book.commentaires?.length || 0} Reviews</p>
            </div>
            <div className="flex gap-4 items-center mb-4 text-sm text-gray-700">
              <img src={heart} alt="" />
              <p>{book.likedBy?.length || 0} likes</p>
            </div>
          </div>

          <p className="text-sm text-gray-500">{book.description}</p>

          <div className="flex gap-2 ml-[600px]">
            <p className="bg-[#DFEA6C] w-[180px] h-[36px] rounded-[8px] flex items-center text-[#677615] justify-center text-gray-800 font-medium mb-1">
              <img src={richa} alt="" />
              {book.auteur}
            </p>

            <div className="flex gap-2">
              {book.categorie?.map((genre, index) => (
                <div
                  key={index}
                  className="bg-[#EBDB9D] w-[132px] h-[36px] rounded-[8px] flex items-center justify-around text-[#885520] font-medium"
                >
                  <img src={genreicon} alt="" />
                  {genre}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4 border-t border-dashed border-gray-400 flex gap-4 justify-between pt-6">
            <div className="flex gap-1">
              {book.discountedPrice ? (
                <>
                  <p className="text-black font-zain font-extrabold text-[32px] leading-[24px] tracking-[0px] p-4 rounded">
                    {book.discountedPrice} DT
                  </p>
                  <p className="text-sm line-through mt-4 text-gray-400">
                    {book.prix_achat} DT
                  </p>
                </>
              ) : (
                <p className="text-lg font-semibold mt-4">
                  {book.prix_achat} DT
                </p>
              )}
              <p className="text-white bg-[#9FB11D] mt-4 w-[43px] h-[19px] rounded-[20px] text-center text-xs flex items-center justify-center">
                {book.prix_location} DT
              </p>
            </div>

            <div className="flex gap-1">

              {subLoading ? (
                <p className="text-gray-500 text-sm mt-4">Checking subscription...</p>
              ) : subError ? (
                <AddToCartButton bookId={book._id} className="bg-[#00BAC7] w-[150px]" />
              ) : hasActiveSubscription ? (
                <RentBookButton bookId={book._id} />
              ) : (
                <AddToCartButton bookId={book._id} className="bg-[#00BAC7] w-[150px]" />
              )}
              <HeartButton bookId={book._id} isAlreadyLiked={isBookLiked} />
                <AddToWishlistButton bookId={book._id} />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
