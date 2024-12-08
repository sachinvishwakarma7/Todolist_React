import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, signup } from "../../api/authApi";
import { notifySuccess } from "../../utils/toast";

export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password, navigate }) => {
    const response = await login({ email, password });
    if (response) {
      notifySuccess("login succesfully!");
      localStorage.setItem("authToken", response?.data?.token);
      navigate("/");
    }
    return response.data;
  }
);

export const SignupUserThunk = createAsyncThunk(
  "auth/signup",
  async ({ username, email, password, navigate }) => {
    const response = await signup({ username, email, password });
    if (response) {
      notifySuccess("User created succesfully!");
      navigate("/login");
    }
    console.log("response", response);
    return response.data;
  }
);
