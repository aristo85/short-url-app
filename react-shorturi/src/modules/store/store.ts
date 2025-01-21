import { configureStore } from "@reduxjs/toolkit";
import { shorturlApi } from "../shorturl/shorturlApi";

export default configureStore({
  reducer: {
    [shorturlApi.reducerPath]: shorturlApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shorturlApi.middleware),
});
