import { createSlice } from "@reduxjs/toolkit";
import {
  DeleteUsersThunk,
  GetAllUsersThunk,
  loginUserThunk,
  UpdateUserThunk,
} from "../thunk/AuthThunk";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    loginData: {},
    allUserList: [],
    status: "idle",
    isloading: false,
    error: null,
  },
  reducers: {
    removeAuthStorage: (state) => {
      state.isloading = false;
      state.status = "idle";
      state.allUserList = [];
      state.loginData = {};
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
        state.loginData = action.payload;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isloading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(GetAllUsersThunk.fulfilled, (state, action) => {
        state.isloading = false;
        state.status = "succeeded";
        state.allUserList = action.payload;
      })
      .addCase(UpdateUserThunk.fulfilled, (state, action) => {
        const { email, profileImage, username, _id } = action.payload;
        state.isloading = false;
        state.status = "succeeded";
        state.loginData = {
          ...state.loginData,
          user: {
            id: _id,
            email: email,
            profileImage: profileImage,
            username: username,
          },
        };
      })
      .addCase(DeleteUsersThunk.fulfilled, (state) => {
        state.isloading = false;
        state.status = "idle";
        state.allUserList = [];
        state.loginData = {};
        state.error = null;
      });
  },
});

export const AuthReducer = AuthSlice.reducer;
export const { removeAuthStorage } = AuthSlice.actions;
