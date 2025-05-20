import React from "react";
import { useGetBooksQuery } from "../slices/bookApi";
import HomeBookCard from "./HomeBookCard";

const shuffleArray = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const PopularBook = () => {
  const { data: books, isLoading, isError } = useGetBooksQuery();

  if (isLoading) return <p>Loading books...</p>;
  if (isError) return <p>Error loading books.</p>;

  if (!books || books.length === 0) {
    return <p>No books available.</p>;
  }

  const randomBooks = shuffleArray(books).slice(0, 6);

  return (
    <div className="w-[90%] mx-auto px-4 mt-12">
      <h2 className="text-[20px] leading-[100%] tracking-[0] font-zain text-[#A1A1A1] mb-6">
        Popular Books
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {randomBooks.map((book) => (
          <HomeBookCard
            key={book._id}
            image={book.imageCouverture}
            title={book.titre}
            price={book.prix_achat}
            book={book}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularBook;
