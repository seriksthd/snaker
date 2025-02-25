import { createSlice } from "@reduxjs/toolkit";
import {
  deleteAllCart,
  deleteCart,
  deleteFavorite,
  getAllCart,
  getAllFavorite,
  getAllSnaker,
  getMyPurchases,
  postCart,
  postFavorite,
  postMyPurchases,
} from "./snakerThunk";
const initialState = {
  snaker: [],
  favorite: [],
  cart: [],
  myPurchases: [],
  isLoading: false,
  isError: "",
  profileImage: localStorage.getItem("profileImage") || null,
};
export const snakerSlice = createSlice({
  name: "snaker",
  initialState,
  reducers: {
    uploadProfileImage: (state, action) => {
      state.profileImage = action.payload;
      localStorage.setItem("profileImage", action.payload);
    },
    deleteProfileImage: (state) => {
      state.profileImage = null;
      localStorage.removeItem("profileImage");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSnaker.fulfilled, (state, action) => {
        state.snaker = action.payload;
        state.isLoading = false;
      })
      .addCase(getMyPurchases.fulfilled, (state, action) => {
        state.myPurchases = action.payload;
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

      .addCase(deleteAllCart.fulfilled, (state) => {
        console.log("state: ", state);
        console.log("deleteAllCart.fulfilled - Cart cleared successfully!");
        state.cart = [];
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.favorite = state.favorite.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(postMyPurchases.fulfilled, (state, action) => {
        state.myPurchases.push(action.payload);
        state.myPurchases = [...state.cart];
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
export const { isLoading, uploadProfileImage, deleteProfileImage } =
  snakerSlice.actions;
export const snakerReducer = snakerSlice.reducer;
