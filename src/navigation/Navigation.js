import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/homePage/HomePage";
import Sidebar from "../components/sidebar/Sidebar";
import SettingPage from "../pages/settingPage/SettingPage";
import TodoListPage from "../pages/todoListPage/TodoListPage";
import Header from "../components/headers/Header";
const Navigation = () => {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Sidebar />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/todoList" Component={TodoListPage} />
        <Route path="/setting" Component={SettingPage} />
      </Routes>
    </BrowserRouter>
  );
};
export default Navigation;
