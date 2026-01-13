import React, { useState } from "react";
import "./App.css";
import DateTime from "./components/DateTime";
import Dropdown from "./components/Dropdown";
import Button from "./components/Button";

const App = () => {
  const [date, setDate] = useState(new Date(2026, 0, 11));
  const options = ["Website Redesign", "Mobile App Development"];
  const [value, setValue] = useState(1);

  const handleIncrement = () => {
    setValue((value) => value + 1);
  };
  const handleDecrement = () => {
    if (value > 1) {
      setValue((value) => value - 1);
    }
  };

  return (
    <div className="">
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
            placeholder="What did you work on today?"
            required
            className="task-description"
          ></textarea>
        </div>
        <div className="hours-container">
          <label htmlFor="">Hours spent</label>
          <div
            className=""
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Button text="-" onClick={handleDecrement} />
            {/* remember to use react icons cause the subtract sign wont work*/}
            <h1>
              {value}
              {""}
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "lighter",
                  color: "#939898ff",
                }}
              >
                {value > 1 ? " hours" : "hour"}
              </span>
            </h1>
            <Button text="+" onClick={handleIncrement} />
          </div>
        </div>
        <div className="status-container">
          <label htmlFor="">Status</label>
        </div>
        <div className="attachment-container">
          <label htmlFor="">Attachment (Optional)</label>
          <div className="attachment-box"></div>
        </div>
        <div className="submit-container">
          <div className="submit-button">Submit Report</div>
        </div>
      </div>
    </div>
  );
};

export default App;
