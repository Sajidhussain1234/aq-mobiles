import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, fetchCount, upDateUser } from "./authAPI";
import { createUser } from "./authAPI";

const initialState = {
  loggedInUser: null,
  error: null,
  status: "idle",
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const data = await createUser(userData);
    return data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (updateUserData) => {
    console.log("updateuser data with addresses", updateUserData);
    const data = await upDateUser(updateUserData);
    return data;
  }
);

export const checkUserAsync = createAsyncThunk(
  "user/checkUser",
  async (loginInfo) => {
    const data = await checkUser(loginInfo);
    return data;
  }
);

export const counterSlice = createSlice({
  name: "user",
  initialState,
  // reducers: {
  //   increment: (state) => {
  //     state.value += 1;
  //   }
  // },

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload; //updated user logged in user
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;
export const { increment } = counterSlice.actions;

export default counterSlice.reducer;
