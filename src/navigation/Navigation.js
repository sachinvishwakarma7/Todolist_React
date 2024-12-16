import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/homePage/HomePage";
import Sidebar from "../components/sidebar/Sidebar";
import SettingPage from "../pages/settingPage/SettingPage";
import TodoListPage from "../pages/todoListPage/TodoListPage";
import LoginPage from "../pages/loginPage/LoginPage";
import ChatPage from "../pages/chatPage/ChatPage";
import SignupPage from "../pages/signupPage/SignupPage";
import { useSelector } from "react-redux";
import Header from "../components/headers/Header";

const Navigation = () => {
  const { loginData } = useSelector((state) => state?.userReducer);

  const PrivateRoute = ({ children }) => {
    return loginData?.token ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      {/* <Header /> */}
      {loginData?.token && <Sidebar />}
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/todoList"
          element={
            <PrivateRoute>
              <TodoListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/setting"
          element={
            <PrivateRoute>
              <SettingPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Navigation;
