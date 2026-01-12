import React, { useState } from "react";
import "./App.css";
import DateTime from "./components/DateTime";
import Dropdown from "./components/Dropdown";

const App = () => {
  const [date, setDate] = useState(new Date(2026, 0, 11));
  const options = ["Website Redesign", "Mobile App Development"];

  return (
    <div>
      <div className="container">
        <div className="datetime-container">
          {/* had to create a custom datetime picker */}
          <DateTime value={date} onChange={setDate} label="Date" />
        </div>
        <div className="project-container">
          <label htmlFor="select">Project</label>
          <Dropdown option={options} />
        </div>
        <div className="task-container">
          <label htmlFor="" style={{ marginBottom: "8px" }}>
            Task Description
          </label>
          <textarea
            id="comment"
            name="comment"
            rows="5"
            placeholder="Write your thoughts here..."
            required
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default App;
