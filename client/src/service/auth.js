// Utils
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Constants
import { AUTH_API, SIGNIN, SIGNUP } from "constants/index";

export const authApi = createApi({
  reducerPath: AUTH_API,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_PATH,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: SIGNIN,
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: SIGNUP,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation: useLogin, useRegisterMutation: useRegister } =
  authApi;
