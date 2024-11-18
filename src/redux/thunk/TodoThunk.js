import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNewTodo,
  deleteTodo,
  fetchTodos,
  searchTodos,
  updateTodo,
} from "../../api/todoApi";

export const fetchTodosThunk = createAsyncThunk(
  "todos/fetchTodos",
  async () => {
    const response = await fetchTodos();
    return response.data;
  }
);

export const addNewTodoThunk = createAsyncThunk(
  "todos/addNewTodo",
  async (data, { dispatch }) => {
    const response = await addNewTodo(data);
    dispatch(fetchTodosThunk());
    return response.data;
  }
);

export const deleteTodoThunk = createAsyncThunk(
  "todos/deleteTodo",
  async (id, { dispatch }) => {
    await deleteTodo(id);
    dispatch(fetchTodosThunk());
    return id;
  }
);

export const searchTodoThunk = createAsyncThunk(
  "todos/serchTodo",
  async (quary) => {
    const response = await searchTodos(quary);
    return response.data;
  }
);

export const updateTodoThunk = createAsyncThunk(
  "todos/updateTodo",
  async (data, { dispatch }) => {
    const { _id, title, description, completed, category, priority } = data;
    const response = await updateTodo(_id, {
      title,
      description,
      completed,
      category,
      priority,
    });
    return response.data;
  }
);
