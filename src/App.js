import React from "react";
import Navigation from "./navigation/Navigation";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "./redux/store";

const App = () => (
  <Provider store={store}>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
      theme="light"
    />
    <Navigation />
  </Provider>
);

export default App;
