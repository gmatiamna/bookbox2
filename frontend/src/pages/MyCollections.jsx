import React, { useEffect } from "react";
import { useGetUserLibraryQuery } from "../slices/orderApi";
import { Link } from "react-router-dom";
import Nav from "../components/nav";

const MyCollection = () => {
  const { data: library = [], isLoading, isError } = useGetUserLibraryQuery();

  useEffect(() => {
    document.title = "My Collection";
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-600">
        Loading your collection...
      </div>
    );
  }

  // Treat isError as empty collection if no data is present
  const isEmpty = isError || library.length === 0;

  return (
    <div className=" min-h-screen">
      <Nav />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <h1 className="text-3xl font-bold mb-6 text-[#724521]">My Collection</h1>

        {isEmpty ? (
          <div className="text-center text-gray-600 py-20">
            <p className="text-lg mb-4">Your collection is currently empty.</p>
            <p className="text-md mb-6">Start paying and begin building your collection today!</p>
            <Link
              to="/library"
              className="inline-block px-6 py-2 bg-[#724521] text-white rounded-xl shadow hover:bg-[#5a3618]"
            >
              Explore Books
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {library.map((book) => {
              const isRental = book.type === "location";
              const isExpired = isRental && new Date(book.rentedTo) < new Date();

              return (
                <div
                  key={book._id}
                  className="bg-white rounded-2xl shadow-md p-4 relative group hover:shadow-xl transition"
                >
                  {isRental && isExpired && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
                      Expired
                    </span>
                  )}

                  <img
                    src={book.coverImage || "/placeholder.jpg"}
                    alt={book.title}
                    className="w-full h-56 object-cover rounded-lg mb-3"
                  />
                  <h2 className="text-lg font-semibold text-[#333] truncate">{book.title}</h2>
                  <p className="text-sm text-gray-500 mb-1">{book.author}</p>
                  <p className="text-sm text-gray-600">
                    {isRental
                      ? isExpired
                        ? `Expired: ${new Date(book.rentedTo).toLocaleDateString()}`
                        : `Rented until: ${new Date(book.rentedTo).toLocaleDateString()}`
                      : "Purchased"}
                  </p>

                  {!isRental || !isExpired ? (
                    <Link
                      to={`/reader/${book.bookId}`}
                      className="inline-block mt-3 text-sm px-4 py-1.5 bg-[#724521] text-white rounded-lg hover:bg-[#5a3618]"
                    >
                      {isRental ? "Read Online" : "Read / Download"}
                    </Link>
                  ) : (
                    <p className="text-red-600 text-sm mt-3 font-medium">Renew to read again</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCollection;
