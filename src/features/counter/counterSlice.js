import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './counterAPI';

const initialState = {
  status: 'idle',
  value: 0,
};

export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (value) => {
    const response = await fetchCount(value); // Api Call
     return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    }
  },
  
  extraReducers: (builder) => {
    builder.addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      }).addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      });
  },
});

export const selectCount = (state) => state.counter.value;

export const { increment} = counterSlice.actions;
export default counterSlice.reducer;
