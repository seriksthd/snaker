import { configureStore } from "@reduxjs/toolkit";
import { snakerReducer } from "./snaker/snakerSlice";

export const store = configureStore({
  reducer: {
    snaker: snakerReducer,
  },
});
