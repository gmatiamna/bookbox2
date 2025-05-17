import React from "react";
import { useGetBooksQuery } from "../slices/bookApi";
import HomeBookCard from "./HomeBookCard";

const PopularBook = () => {
  const { data: books, isLoading, isError } = useGetBooksQuery();

  if (isLoading) return <p>Loading books...</p>;
  if (isError) return <p>Error loading books.</p>;

  // Make sure 'books' is an array before trying to map over it
  if (!books || books.length === 0) {
    return <p>No books available.</p>;
  }

  return (
    <div className="w-[90%] mx-auto px-4 mt-12">
      <h2 className="text-[20px] leading-[100%] tracking-[0] font-zain text-[#A1A1A1] mb-6">
        Popular Books
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {books.slice(0, 6).map((book) => (
          <HomeBookCard
            key={book._id}
            image={book.imageCouverture}
            title={book.titre}
            price={book.prix_achat}
            book={book}  // Pass the full book object
          />
        ))}
      </div>
    </div>
  );
};

export default PopularBook;
