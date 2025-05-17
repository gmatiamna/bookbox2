import React, { useEffect } from "react";
import { useGetUserLibraryQuery } from "../slices/orderApi";
import { Link } from "react-router-dom";
import Nav from "../components/nav";
const MyCollection = () => {
  const { data: library = [], isLoading, isError } = useGetUserLibraryQuery();

  useEffect(() => {
    document.title = "My Collection";
  }, []);

  if (isLoading) return <div className="p-4">Loading your collection...</div>;
  if (isError) return <div className="p-4 text-red-600">Failed to load your collection.</div>;

  return (
    <div>
      <Nav/>
      <div className="p-6 mt-20" ><h1 className="text-2xl font-semibold mb-4">My Collection</h1>
      {library.length === 0 ? (
        <p className="text-gray-500">Your collection is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {library.map((book) => {
            const isRental = book.type === "location";
            const isExpired = isRental && new Date(book.rentedTo) < new Date();

            return (
              <div
                key={book._id}
                className={`p-4 rounded-xl shadow-md border ${
                  isExpired ? "border-red-400 bg-red-50" : "bg-white"
                }`}
              >
                <img
                  src={book.coverImage || "/placeholder.jpg"}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded-md mb-2"
                />
                <h2 className="text-lg font-bold">{book.title}</h2>
                <p className="text-sm text-gray-600">{book.author}</p>
                <p className="text-sm mt-1">
                  {isRental
                    ? isExpired
                      ? `Rental expired on: ${new Date(book.rentedTo).toLocaleDateString()}`
                      : `Rented until: ${new Date(book.rentedTo).toLocaleDateString()}`
                    : "Purchased"}
                </p>
                {isRental && isExpired ? (
                  <p className="text-red-600 text-sm font-semibold mt-2">Rental expired</p>
                ) : (
                  <Link
                    to={`/reader/${book.bookId}`}
                    className="inline-block mt-3 px-3 py-1 text-sm text-white bg-[#724521] rounded hover:bg-[#5a3618]"
                  >
                    {isRental ? "Read Online" : "Read / Download"}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div></div>
      
  );
};

export default MyCollection;
