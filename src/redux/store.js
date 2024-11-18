import { configureStore } from "@reduxjs/toolkit";
import { TodoReducer } from "./slices/TodoSlice";

const store = configureStore({
  reducer: {
    todoReducer: TodoReducer,
  },
});

export default store;
