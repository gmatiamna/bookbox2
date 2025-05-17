// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";  // Import apiSlice for RTK Query
import authReducer from "./authslice";  // Import the auth reducer
import bookReducer from './bookSlice';
export const store = configureStore({
  reducer: {
    // Add the apiSlice reducer so that API calls are managed correctly
    [apiSlice.reducerPath]: apiSlice.reducer,
    book: bookReducer,
    // Add the auth reducer for managing user authentication state
    auth: authReducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware), // This adds the API middleware to handle caching, invalidation, etc.
});
