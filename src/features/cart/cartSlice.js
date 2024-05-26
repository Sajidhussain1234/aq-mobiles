import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteItemFromCart,
  fetchItemsByUserId,
  updateCart,
} from "./cartAPI";

const initialState = {
  status: "idle",
  items: [],
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const data = await addToCart(item);
    return data;
  }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  "cart/fetchItemsByUserId",
  async (userId) => {
    const data = await fetchItemsByUserId(userId);
    return data;
  }
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (update) => {
    const data = await updateCart(update);
    return data;
  }
);

export const deleteItemFromCartAsync = createAsyncThunk(
  "cart/deleteFromCart",
  async (itemId) => {
    const data = await deleteItemFromCart(itemId);
    return data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1);
      });
  },
});

export const selectItems = (state) => state.cart.items;

export default cartSlice.reducer;
