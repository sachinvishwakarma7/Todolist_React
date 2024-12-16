import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteUser,
  getAllUsers,
  login,
  signup,
  updateUser,
} from "../../api/authApi";
import { notifyError, notifySuccess } from "../../utils/toast";

export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password, navigate }, { dispatch }) => {
    const response = await login({ email, password });

    if (
      response.status === 401 ||
      response.status === 404 ||
      response.status === 400 ||
      response.status === 500 ||
      response.message === "Network Error"
    ) {
      notifyError(response.response.data.message);
    }

    if (response.status === 201 || response.status === 200) {
      notifySuccess("login succesfully!");
      localStorage.setItem("authToken", response?.data?.token);
      navigate("/");
      dispatch(GetAllUsersThunk());
    }
    return response.data;
  }
);

export const SignupUserThunk = createAsyncThunk(
  "auth/signup",
  async ({ username, email, password, navigate }) => {
    const response = await signup({ username, email, password });

    if (
      response.status === 401 ||
      response.status === 400 ||
      response.status === 500 ||
      response.message === "Network Error"
    ) {
      notifyError(response.response.data.message);
    }

    if (response.status === 201 || response.status === 200) {
      notifySuccess("User created succesfully!");
      navigate("/login");
    }
    return response.data;
  }
);

export const UpdateUserThunk = createAsyncThunk(
  "auth/updateUser",
  async ({ userId, username, profileImage, changePassword }, { dispatch }) => {
    const response = await updateUser({
      userId,
      username,
      profileImage,
      changePassword,
    });
    if (response.status === 413) {
      notifyError("Payload Too Large");
    }
    if (response.status === 200 || response.status === 201) {
      notifySuccess("Profile updated successfully!");
      dispatch(GetAllUsersThunk());
    }
    return response.data.data;
  }
);

export const GetAllUsersThunk = createAsyncThunk(
  "auth/getAllUsers",
  async () => {
    const response = await getAllUsers();
    return response.data;
  }
);

export const DeleteUsersThunk = createAsyncThunk(
  "auth/deleteUser",
  async ({ userId }) => {
    const response = await deleteUser({ userId });
    if (response.status === 201 || response.status === 200) {
      notifySuccess("Delete user succesfully!");
      localStorage.removeItem("authToken");
    }
    return response.data;
  }
);
