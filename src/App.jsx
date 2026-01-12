import React, { useState } from "react";
import "./App.css";
import DateTime from "./components/DateTime";

const App = () => {
  const [date, setDate] = useState(new Date(2026, 0, 11)); // January 11, 2026

  return (
    <div>
      <div className="container">
        <div className="datetime-container">
          {/* had to create a custom datetime picker */}
          <DateTime value={date} onChange={setDate} label="Select Date" />
        </div>
        <div className="project-container">
          <label htmlFor="select"></label>
          <select
            name=""
            id=""
            aria-placeholder="select a project"
            className="project-dropdown"
          >
            <option value="">project1</option>
            <option value="">project2</option>
            <option value="">project3</option>
            <option value="">project4</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default App;
