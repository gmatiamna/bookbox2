import { apiSlice } from "./apiSlice";

export const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books/getbooks",
      providesTags: ["Book"],
    }),
    getNewFavoriteBooks: builder.query({
      query: () => "/books/new-favorites",
      providesTags: ["Book"],
    }),
    getBooksWithDeals: builder.query({
      query: () => "/offers/active-books",
    }),
    getMostRatedBook: builder.query({
  query: () => "/books/most-rated",
  providesTags: ["Book"],
}),

    getFilteredBooks: builder.query({
      query: (params) => ({
        url: `/books/filterbook`,
        params,
      }),
      providesTags: ["Book"],
    }),
    getAllAuthors: builder.query({
      query: () => "/books/authors",
    }),
     checkHasReviewed: builder.query({
      query: ({ bookId, userId }) => `/books/${bookId}/has-reviewed/${userId}`,
    }),
    getLatestComment: builder.query({
  query: (bookId) => `/books/${bookId}/comments/latest`,
}),
    getGenres: builder.query({
      query: () => "/books/getGenres",
    }),
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: (result, error, id) => [{ type: "Book", id }],
    }),
      getBestSellers: builder.query({
      query: () => 'books/best-seller', 
    }),
    addToLikedBooks: builder.mutation({
      query: (bookId) => ({
        url: `/books/${bookId}/like`,
        method: "POST",
      }),
    }),
    getLikedBooks: builder.query({
      query: () => "/books/liked",
      providesTags: ["Book"],
    }),
    removeFromLikedBooks: builder.mutation({
      query: (bookId) => ({
        url: `/books/${bookId}/like`,
        method: "DELETE",
      }),
    }),

    // ✅ Add this
   getSecurePdf: builder.query({
        query: (bookId) => `/books/secure-pdf/${bookId}`, // Or your actual route
  providesTags: ['BookAccess'],
}),

  }),
});


// ✅ Don't forget to export it
export const {
  useGetBooksQuery,
  useGetNewFavoriteBooksQuery,
  useGetBooksWithDealsQuery,
  useGetFilteredBooksQuery,
  useGetAllAuthorsQuery,
  useGetGenresQuery,
  useGetBookByIdQuery,
  useAddToLikedBooksMutation,
  useGetLikedBooksQuery,useCheckHasReviewedQuery ,
  useRemoveFromLikedBooksMutation,useGetSecurePdfQuery,useGetLatestCommentQuery,
  useGetBestSellersQuery,useGetMostRatedBookQuery
} = bookApi;
