import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder } from "./orderAPI";

const initialState = {
  status: "idle",
  orders: [],
  currentOrder: null,
};
// we may need more information about this order

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (newOrder) => {
    const data = await createOrder(newOrder); // Api Call
    return data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      });
  },
});

export const { resetCurrentOrder } = orderSlice.actions;
export const selectCurrentOrder = (state) => state.order.currentOrder;

export default orderSlice.reducer;
