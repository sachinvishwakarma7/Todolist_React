import apiClient from "./apiClient";

export const login = ({ email, password }) =>apiClient.post("/api/user/login", { email, password });

export const signup = ({ username, email, password }) =>apiClient.post("/api/user/signup", { username, email, password });
