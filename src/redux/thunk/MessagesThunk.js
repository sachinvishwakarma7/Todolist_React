import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMessages } from "../../api/messagesApi";

export const GetMessagesThunk = createAsyncThunk(
  "messages/getMessages",
  async ({ senderId, recipientId }) => {
    const response = await getMessages({ senderId, recipientId });
    return response.data.data;
  }
);
