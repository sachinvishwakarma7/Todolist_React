import { toast } from "react-toastify";

export const notifySuccess = (message = "This is a success message!") => {
  toast.success(message);
};

export const notifyError = (message = "This is an error message!") => {
  toast.error(message);
};
