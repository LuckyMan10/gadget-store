import { configureStore } from "@reduxjs/toolkit";
import appVisibleSlice from "features/appVisible/appVisibleSlice";
import {apiSlice} from "features/api/appApiSlice";

export const store = configureStore({
  reducer: {
    appVisible: appVisibleSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
