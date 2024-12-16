import React, { useEffect } from "react";
import Navigation from "./navigation/Navigation";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "./redux/store";

const App = () => (

  // useEffect(()=>{
  //   if
  //   localStorage.setItem("authToken", response?.data?.token);
  //   navigate("/");
  // },[])

  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
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
    </PersistGate>
  </Provider>
);

export default App;
