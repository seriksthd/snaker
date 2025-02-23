import { createAsyncThunk } from "@reduxjs/toolkit";
import { axionsInstance } from "../../api/axionsInstance";

export const getAllSnaker = createAsyncThunk(
  "snaker/getAllSnaker",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axionsInstance("/snaker");
      return data;
    } catch (error) {
      return rejectWithValue(error);
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
      return rejectWithValue(error);
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
      return rejectWithValue(error);
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
      return rejectWithValue(error);
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
      return rejectWithValue(error);
    }
  }
);
export const deleteCart = createAsyncThunk(
  "snaker/deleteCart",
  async (id, { rejectWithValue }) => {
    try {
      await axionsInstance.delete(`/cart/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
