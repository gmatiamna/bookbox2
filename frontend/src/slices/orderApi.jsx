// orderApi.js (or wherever you define your apiSlice)

import { apiSlice } from "./apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    buyAllBooks: builder.mutation({
      query: (orderData) => ({
        url: "/orders/",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Cart", "Library"],
    }),
    rentBookWithSubscription: builder.mutation({
      query: (bookId) => ({
        url: `orders/rent-subscription/${bookId}`,
        method: "POST",
      }),
      invalidatesTags: ["Library"], // to refresh user's rented books
    }),
    getUserLibrary: builder.query({
      query: () => "/library",
      providesTags: ["Library"],
      transformResponse: (response) => {
        if (!response || !Array.isArray(response.books)) {
          return [];
        }

        return response.books.map((item) => {
          const book = item.bookId;
          return {
            _id: item._id,
            bookId: book._id,
            title: book.titre,
            author: book.auteur,
            coverImage: book.imageCouverture,
            type: item.type,
            rentedFrom: item.rentedFrom,
            rentedTo: item.rentedTo,
          };
        });
      },
    }),
  }),
});

export const { useBuyAllBooksMutation, useRentBookWithSubscriptionMutation, useGetUserLibraryQuery } = orderApi;
