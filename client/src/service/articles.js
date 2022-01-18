// Utils
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const articlesApi = createApi({
  reducerPath: "articlesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_PATH
  }),
  endpoints: builder => ({
    getArticles: builder.query({
      query: () => "articles"
    })
  })
});

export const { useGetArticlesQuery: useGetArticles } = articlesApi;
