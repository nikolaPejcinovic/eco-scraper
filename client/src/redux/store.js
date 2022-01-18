// Utils
import { configureStore, createEntityAdapter } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// Service
import { articlesApi } from "service/articles";

const articlesAdapter = createEntityAdapter();

export const store = configureStore({
  preloadedState: articlesAdapter.getInitialState(),
  reducer: {
    [articlesApi.reducerPath]: articlesApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(articlesApi.middleware)
});

store.dispatch()

store.subscribe(() => console.log(store.getState()));

setupListeners(store.dispatch);
