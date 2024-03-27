import React from "react";
import Body from "./components/body/body";
import Sidebar from "./components/sidebar/sidebar";
import "./App.css";

const App = () => {
  return (
    <div className="container">
      <Body/>
      <Sidebar/>
    </div>
  )
};

export default App;
