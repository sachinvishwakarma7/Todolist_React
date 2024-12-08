import { createSlice } from "@reduxjs/toolkit";
import { loginUserThunk } from "../thunk/AuthThunk";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    data: {},
    status: "idle",
    isloading: false,
    error: null,
  },
  reducers: {
    removeAuthStorage: (state) => {
      state.isloading = false;
      state.status = "idle";
      state.data = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.status = "loading";
        state.isloading = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isloading = false;
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isloading = false;
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const AuthReducer = AuthSlice.reducer;
export const { removeAuthStorage } = AuthSlice.actions;
