// Utils
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// Constants
import { AUTH } from "constants/index";

// Service
import { articlesApi } from "service/articles";
import { authApi } from "service/auth";

// Reducers
import authReducer from "./reducers/authReducer";

export const store = configureStore({
  reducer: {
    [articlesApi.reducerPath]: articlesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(articlesApi.middleware)
      .concat(authApi.middleware),
});

store.subscribe(() =>
  localStorage.setItem(AUTH, JSON.stringify(store.getState().auth))
);

setupListeners(store.dispatch);
