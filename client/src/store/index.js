import { configureStore } from "@reduxjs/toolkit";

import { authApiSlice } from "./authApiSlice";
import postReducer from "./postSlice";

const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    post: postReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApiSlice.middleware),
});

export default store;
