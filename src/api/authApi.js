import apiClient from "./apiClient";

export const login = ({ email, password }) =>
  apiClient
    .post("/api/user/login", { email, password })
    .then((res) => res)
    .catch((err) => err);

export const signup = ({ username, email, password }) =>
  apiClient
    .post("/api/user/signup", { username, email, password })
    .then((res) => res)
    .catch((err) => err);

export const updateUser = ({
  userId,
  username,
  profileImage,
  changePassword,
}) =>
  apiClient
    .put(`/api/user/${userId}`, {
      username,
      profileImage,
      changePassword,
    })
    .then((res) => res)
    .catch((err) => err);

export const getAllUsers = () =>
  apiClient
    .get("/api/user/list")
    .then((res) => res)
    .catch((err) => err);

export const deleteUser = ({ userId }) =>
  apiClient
    .delete(`/api/user/${userId}`)
    .then((res) => res)
    .catch((err) => err);
