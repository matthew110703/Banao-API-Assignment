import { axiosBaseQuery } from "../lib/api";

export const getPosts = async () => {
  const queryFn = axiosBaseQuery({ baseUrl: import.meta.env.VITE_API_URL });
  return (await queryFn({ url: "/posts", method: "GET" })).data;
};

export const createPost = async (post) => {
  const queryFn = axiosBaseQuery({ baseUrl: import.meta.env.VITE_API_URL });
  return (await queryFn({ url: "/posts", method: "POST", data: post })).data;
};
