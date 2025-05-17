import React from 'react';
import { useGetBooksWithDealsQuery } from '../slices/bookApi';
import DealBook from './Dealbook';

const DealBookList = () => {
  const { data: books, isLoading, error } = useGetBooksWithDealsQuery();

  if (isLoading) return <p>Loading deals...</p>;
  if (error) return <p>Error loading deals</p>;

  return (
    <div> 
    <h1 className="font-zain font-bold text-[52px] leading-[100%] text-[#9FB11D] mx-auto w-[30%] mt-16 mb-">
  Flash Deals on Books
</h1>

      <div className="w-[90%] mx-auto flex justify-between">
      {books.map((book) => (
        <DealBook key={book._id} book={book} />
      ))}
    </div>
    </div>
   
  );
};

export default DealBookList;
