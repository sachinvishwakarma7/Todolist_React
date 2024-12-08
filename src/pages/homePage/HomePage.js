import React, { useState } from "react";
import "./HomePage.css";

const HomePage = () => {
  const [pageData, setPageData] = useState("");

  const onDragStart = (e) => {
    e.dataTransfer.setData("text", "hello i am sachin");
  };

  const onDrop = (e) => {
    e.preventDefault();
    setPageData(e.dataTransfer.getData("text"));
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  // useEffect(()=>{
  //   localStorage.removeItem('authToken')
  // },[])

  return (
    <div className="home-container">
      <div
        draggable={true}
        onDragStart={onDragStart}
        style={{
          height: "200px",
          width: "200px",
          margin: "20px",
          backgroundColor: "whitesmoke",
        }}
      >
        <span>setData</span>
      </div>

      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        style={{
          height: "200px",
          margin: "20px",
          width: "200px",
          backgroundColor: "whitesmoke",
        }}
      >
        <span>{pageData}</span>
      </div>
    </div>
  );
};

export default HomePage;
