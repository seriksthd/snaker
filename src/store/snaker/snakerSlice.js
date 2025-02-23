import { createSlice } from "@reduxjs/toolkit";
import {
  deleteCart,
  getAllCart,
  getAllFavorite,
  getAllSnaker,
  postCart,
  postFavorite,
} from "./snakerThunk";

export const snakerSlice = createSlice({
  name: "snaker",
  initialState: {
    snaker: [],
    favorite: [],
    cart: [],
    isLoading: false,
    isError: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSnaker.fulfilled, (state, action) => {
        state.snaker = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllFavorite.fulfilled, (state, action) => {
        state.favorite = action.payload;
        state.isLoading = false;
      })
      .addCase(postFavorite.fulfilled, (state, action) => {
        state.favorite.push(action.payload);
      })
      .addCase(getAllCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      })
      .addCase(postCart.fulfilled, (state, action) => {
        state.cart.push(action.payload);
      })
      .addCase(getAllSnaker.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSnaker.rejected, (state) => {
        state.isLoading = false;
        state.isError = "error";
      });
  },
});
export const { isLoading } = snakerSlice.actions;
export const snakerReducer = snakerSlice.reducer;
