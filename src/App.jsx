import React from "react";
import "./App.css";
import DateTime from "./components/DateTime";

const App = () => {
  return (
    <div>
      <div className="container">
        <div className="datetime-container">
          <label>Date</label>
          <DateTime />
        </div>
      </div>
    </div>
  );
};

export default App;
