// src/api/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const url = "http://localhost:5000";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: url + "/api",
    credentials: "include",
  }),
  tagTypes: ["User", "Book", "Order","Cart"],
  endpoints: () => ({}), // leave empty for injection
});
