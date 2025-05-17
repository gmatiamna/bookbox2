import React, { useState } from "react";
import BookCard from "../LibraryComponets/BookCard";
import FilterPanel from "../LibraryComponets/Filter";
import {
  useGetFilteredBooksQuery,
  useGetGenresQuery,
  useGetAllAuthorsQuery,
} from "../slices/bookApi";

export default function BookShow() {
  const [filters, setFilters] = useState({
    categorie: "",
    prixMin: 0,
    prixMax: 100,
    noteMin: 0,
    auteur: "",
  });

  const { data: books = [], refetch } = useGetFilteredBooksQuery(filters);
  const { data: genres = [] } = useGetGenresQuery();
  const { data: authors = [] } = useGetAllAuthorsQuery();

  const [page, setPage] = useState(1);
  const booksPerPage = 6;
  const totalPages = Math.ceil(books.length / booksPerPage);
  const paginatedBooks = books.slice(
    (page - 1) * booksPerPage,
    page * booksPerPage
  );

  const fetchBooks = () => {
    refetch();
    setPage(1); // Reset to first page when filters are applied
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="flex gap-3 w-[95%] mx-auto">
      {/* Filters Panel */}
      <div className="w-[20%]">
        <h2 className="text-center text-[#40879A] font-[Zain] font-bold text-[30px]">Filters</h2>
        <div className="flex justify-between gap-5">
          <FilterPanel
            genres={genres}
            authors={authors}
            filters={filters}
            setFilters={setFilters}
            onApply={fetchBooks}
          />
        </div>
      </div>

      {/* Books Display */}
      <div className="w-[80%]">
        <h1 className="text-[52px] w-[10%] mx-auto font-extrabold text-[#40879A] font-[Zain]">BOOKS</h1>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {paginatedBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="border border-[#DFE4EA] p-2 rounded-2xl w-fit mx-auto">

           {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 text-[#9FB11D] font-semibold">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 border rounded hover:bg-[#9FB11D] hover:text-white disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1 border rounded ${
                    page === pageNum ? "bg-[#9FB11D] text-[#DFE4EA]" : "hover:bg-gray-200"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded hover:bg-[#9FB11D] hover:text-white disabled:opacity-50"
            >
          next
            </button>
          </div>
        )}</div>
      
      </div>
    </div>
  );
}
