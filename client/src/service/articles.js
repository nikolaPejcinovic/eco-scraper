// Utils
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Constants
import { ARTICLES, ARTICLES_API } from "constants/index";

export const articlesApi = createApi({
  reducerPath: ARTICLES_API,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_PATH,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set("x-access-token", token);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: () => ARTICLES,
    }),
    getArticle: builder.query({
      query: (id) => `${ARTICLES}/${id}`,
    }),
  }),
});

export const {
  useGetArticlesQuery: useGetArticles,
  useGetArticleQuery: useGetArticle,
} = articlesApi;
