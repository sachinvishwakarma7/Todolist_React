import { createSlice } from "@reduxjs/toolkit";
import {
  addNewTodoThunk,
  deleteTodoThunk,
  fetchTodosThunk,
  searchTodoThunk,
  updateTodoThunk,
} from "../thunk/TodoThunk";

const TodoSlice = createSlice({
  name: "todos",
  initialState: {
    data: [],
    status: "idle",
    isloading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosThunk.pending, (state) => {
        state.status = "loading";
        state.isloading = true;
      })
      .addCase(fetchTodosThunk.fulfilled, (state, action) => {
        state.isloading = false;
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchTodosThunk.rejected, (state, action) => {
        state.isloading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      // Handle add todo similarly
      .addCase(addNewTodoThunk.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      // Handle search todo similarly
      .addCase(searchTodoThunk.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      // Handle delete similarly
      .addCase(deleteTodoThunk.fulfilled, (state, action) => {
        state.data = state.data.filter((todo) => todo._id !== action.payload);
      })
      // Handle update similarly
      .addCase(updateTodoThunk.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (todo) => todo._id === action.payload._id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      });
  },
});

export const TodoReducer = TodoSlice.reducer;
