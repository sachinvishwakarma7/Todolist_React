import React, { useEffect } from "react";
import { fetchTodosThunk } from "../../redux/thunk/TodoThunk";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();

  
  return <div>HomePage</div>;
};

export default HomePage;
