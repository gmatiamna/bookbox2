
import { apiSlice } from "./apiSlice";

export const wishlistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   addToWishlist: builder.mutation({
  query: (bookId) => ({
    url: `/wishlist/add`,
    method: "POST",
    body: { bookId }, // this is critical
  }),
  invalidatesTags: ["wishlist"],
}),
    removeFromWishlist: builder.mutation({
      query: (bookId) => ({
        url: `/wishlist/remove`,
        method: "DELETE",
        body: { bookId },
      }),
      invalidatesTags: ["wishlist"],
    }),
    getWishlist: builder.query({
      query: () => "/wishlist",
      providesTags: ["wishlist"],
    }),
  }),
});

export const {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useGetWishlistQuery,
} = wishlistApi;
