import { createAsyncThunk } from "@reduxjs/toolkit";
import { axionsInstance } from "../../api/axionsInstance";

export const getAllSnaker = createAsyncThunk(
  "snaker/getAllSnaker",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axionsInstance("/snaker");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch snakers");
    }
  }
);

export const getAllFavorite = createAsyncThunk(
  "snaker/getAllFavorite",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axionsInstance("/favorite");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch favorites"
      );
    }
  }
);
export const getMyPurchases = createAsyncThunk(
  "snaker/getMyPurchases",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axionsInstance("/myPurchases");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch favorites"
      );
    }
  }
);

export const postFavorite = createAsyncThunk(
  "snaker/postFavorite",
  async (product, { rejectWithValue }) => {
    try {
      const { data } = await axionsInstance.post("/favorite", product);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to add to favorites"
      );
    }
  }
);

export const postMyPurchases = createAsyncThunk(
  "snaker/postMyPurchases",
  async (myPurchases, { rejectWithValue }) => {
    try {
      const { data } = await axionsInstance.post("/myPurchases", myPurchases);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to add to purchases"
      );
    }
  }
);
export const getAllCart = createAsyncThunk(
  "snaker/getAllCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axionsInstance("/cart");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch cart items"
      );
    }
  }
);
export const deleteCart = createAsyncThunk(
  "snaker/deleteCart",
  async (itemId, { rejectWithValue }) => {
    try {
      await axionsInstance.delete(`/cart/${itemId}`);
      return itemId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete from cart"
      );
    }
  }
);

export const deleteAllCart = createAsyncThunk(
  "snaker/deleteAllCart",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { cart } = getState().snaker;
      for (const item of cart) {
        console.log("Deleting item with id:", item.id);
        await axionsInstance.delete(`/cart/${item.id}`);
      }

      return [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete all cart items"
      );
    }
  }
);

export const deleteFavorite = createAsyncThunk(
  "snaker/deleteFavorite",
  async (itemId, { rejectWithValue }) => {
    try {
      await axionsInstance.delete(`/favorite/${itemId}`);
      return itemId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete from favorites"
      );
    }
  }
);

export const postCart = createAsyncThunk(
  "snaker/postCart",
  async (product, { rejectWithValue }) => {
    try {
      const { data } = await axionsInstance.post("/cart", product);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add to cart");
    }
  }
);


// uploadProfileImage деген Thunk түзүү
export const uploadProfileImage = createAsyncThunk(
  "profileImage/uploadProfileImage", 
  async (image, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      
      const response = await axios.post("/profileImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log('response: ', response.datax);

      return response.data.image; // Серверден алган файлдын URL'ин кайтаруу
    } catch (error) {
      return rejectWithValue(error.response.data); // Эгерде ката чыкса, анын жоопторун кайтаруу
    }
  }
);