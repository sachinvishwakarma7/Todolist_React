import apiClient from "./apiClient";

export const getMessages = ({ senderId, recipientId }) =>
  apiClient
    .get(`api/user/messages?senderId=${senderId}&recipientId=${recipientId}`)
    .then((res) => res)
    .catch((err) => err);

export const sendMessage = ({ senderId, recipientId, message }) =>
  apiClient
    .post(`api/user/messages`, { senderId, recipientId, message })
    .then((res) => res)
    .catch((err) => err);
