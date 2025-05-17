// src/api/cartApi.js
import { apiSlice } from "./apiSlice";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (data) => ({
        url: "/cart",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"], // ✅ Use declared tag
    }),
    getUserCart: builder.query({
      query: () => "/cart",
      providesTags: ["Cart"], // ✅ Needed to auto-refetch when invalidated
    }),
    purchaseCart: builder.mutation({
      query: () => ({
        url: "/order",
        method: "POST",
      }),
      invalidatesTags: ["Cart"], // ✅ Clear the cart on success
    }),
    clearCart: builder.mutation({
  query: () => ({
    url: "/cart",
    method: "DELETE",
  }),
  invalidatesTags: ["Cart"],
}),
  }),
  overrideExisting: false,
});

export const {
  useAddToCartMutation,
  useGetUserCartQuery,
  usePurchaseCartMutation,useClearCartMutation
} = cartApi;
