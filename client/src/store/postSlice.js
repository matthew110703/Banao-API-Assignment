import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { addPost, setPosts } = postSlice.actions;

export default postSlice.reducer;
