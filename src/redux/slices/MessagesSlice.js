import { createSlice } from "@reduxjs/toolkit";
import { GetMessagesThunk } from "../thunk/MessagesThunk";

const MessagesSlice = createSlice({
  name: "messages",
  initialState: {
    messagesData: [],
    selectedUser: {},
    status: "idle",
    isloading: false,
    error: null,
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    removeMessagesStorage: (state) => {
      state.isloading = false;
      state.status = "idle";
      state.messagesData = [];
      state.selectedUser = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetMessagesThunk.pending, (state) => {
        state.status = "loading";
        state.isloading = true;
      })
      .addCase(GetMessagesThunk.fulfilled, (state, action) => {
        state.isloading = false;
        state.status = "succeeded";
        state.messagesData = action.payload;
      })
      .addCase(GetMessagesThunk.rejected, (state, action) => {
        state.isloading = false;
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const MessagesReducer = MessagesSlice.reducer;
export const { removeMessagesStorage, setSelectedUser } = MessagesSlice.actions;
