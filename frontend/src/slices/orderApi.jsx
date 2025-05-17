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
   getUserLibrary: builder.query({
  query: () => "/library",
  providesTags: ["Library"],
  transformResponse: (response) => {
    // Safely handle case where books might be missing or undefined
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

export const { useBuyAllBooksMutation, useGetUserLibraryQuery } = orderApi;
