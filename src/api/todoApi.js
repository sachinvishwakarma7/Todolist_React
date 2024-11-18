import apiClient from "./apiClient";

export const fetchTodos = () => apiClient.get("/api/todo");
export const searchTodos = (quary) => apiClient.get(`/api/todo/search?query=${quary}`);
export const addNewTodo = (newTodo) => apiClient.post("/api/todo", newTodo);
export const deleteTodo = (id) => apiClient.delete(`/api/todo/${id}`);
export const updateTodo = (id, data) => apiClient.put(`/api/todo/${id}`, data);