import { configureStore } from "@reduxjs/toolkit";
import addDataReducer from "features/api/appDataApiSlice";

export const store = configureStore({
  reducer: {
    appData: addDataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
