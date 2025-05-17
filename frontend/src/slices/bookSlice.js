import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    likedBooks: {},  // Make sure likedBooks is defined as an empty object
    likesCount: {},  // Same for likesCount
  };
  
  const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
      setLikedBook: (state, action) => {
        const { bookId, liked } = action.payload;
        state.likedBooks[bookId] = liked;
      },
      setLikesCount: (state, action) => {
        const { bookId, likes } = action.payload;
        state.likesCount[bookId] = likes;
      },
    },
  });


  export const { setLikedBook, setLikesCount } = bookSlice.actions;
  export const selectLikedBook = (state, bookId) => state.book.likedBooks[bookId];
  export const selectLikesCount = (state, bookId) => state.book.likesCount[bookId];

export default bookSlice.reducer;