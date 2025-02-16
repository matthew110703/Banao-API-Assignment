import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../lib/api";

export const authApiSlice = createApi({
  reducerPath: "auth",
  baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signup",
        method: "post",
        data: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "post",
        data: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "post",
      }),
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation } = authApiSlice;
