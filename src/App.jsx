import React, { useState } from "react";
import "./App.css";
import DateTime from "./components/DateTime";
import Dropdown from "./components/Dropdown";
import { CounterButton, SubmitButton, StatusButton } from "./components/Button";
import { FiUpload, FiMinus, FiPlus } from "react-icons/fi";
import Tabs from "./components/Tabs";
import {
  LuFileCheck,
  LuClock4,
  LuClipboardList,
  LuReceipt,
  LuStar,
  LuSettings2,
  LuBell,
} from "react-icons/lu";

const App = () => {
  const [date, setDate] = useState(new Date(2026, 0, 11));
  const options = [
    "Website Redesign",
    "Mobile App Development",
    "API Integration",
    "Database Migration",
    "Client Dashboard",
  ];
  const [value, setValue] = useState(1);
  const [activeButton, setActiveButton] = useState(1);
  const [activeTab, setActiveTab] = useState(2);
  const status = ["Completed", "In Progress", "Pending", "Blocked"];
  const navTab = [
    { text: "Submissions", logo: <LuFileCheck /> },
    { text: "Timesheet", logo: <LuClock4 /> },
    { text: "Tasks", logo: <LuClipboardList /> },
    { text: "Expense", logo: <LuReceipt /> },
    { text: "Review", logo: <LuStar /> },
    { text: "Builder", logo: <LuSettings2 /> },
  ];

  const handleIncrement = () => {
    setValue((value) => value + 0.5);
  };
  const handleDecrement = () => {
    if (value > 0.5) {
      setValue((value) => value - 0.5);
    }
  };
  const handleSelectStatus = (index) => {
    setActiveButton(index);
  };
  const handleSelectTab = (index) => {
    setActiveTab(index);
  };
  return (
    <div className="screen">
      <div className="header">
        <div className="nav-section">
          <div className="heading">
            <div className="" style={{ display: "flex", gap: "10px" }}>
              <div
                className=""
                style={{
                  width: "2.75rem",
                  height: "2.75rem",
                  backgroundColor: "#2d9d92",
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  fontSize: "1.3rem",
                }}
              >
                <LuClipboardList />
              </div>
              <div
                className=""
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "fit-content",
                  gap: "5px",
                }}
              >
                <h4 style={{ fontSize: "1.125rem", fontWeight: "600" }}>
                  Task Report
                </h4>
                <p style={{ fontSize: "0.875rem", color: "#6c7c93" }}>
                  Log your activities
                </p>
              </div>
            </div>

            <div className="notification">
              <LuBell />
            </div>
          </div>
          <Tabs tabs={navTab} onClick={handleSelectTab} activTab={activeTab} />
        </div>
      </div>
      <div className="main">
        {activeTab === 2 ? (
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
                <CounterButton text={<FiMinus />} onClick={handleDecrement} />
                {/* remember to use react icons cause the subtract sign wont work*/}
                <h1 style={{ fontSize: "1.85rem", fontWeight: "600" }}>
                  {value}
                  {""}
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "lighter",
                      color: "#939898ff",
                    }}
                  >
                    {value > 1 ? " hours" : " hour"}
                  </span>
                </h1>
                <CounterButton text={<FiPlus />} onClick={handleIncrement} />
              </div>
            </div>
            <div className="status-container">
              <label htmlFor="">Status</label>
              <div className="status-grid">
                {status.map((status, key) => {
                  return (
                    <StatusButton
                      text={status}
                      key={key}
                      classStyle={activeButton === key ? "select" : ""}
                      onClick={() => handleSelectStatus(key)}
                    />
                  );
                })}
              </div>
            </div>
            <div className="attachment-container">
              <label htmlFor="">Attachment (Optional)</label>
              <div className="attachment-box">
                <FiUpload />
                <p style={{ fontSize: "14px" }}>
                  {" "}
                  <span style={{ color: "#2d9d92", fontWeight: "500" }}>
                    Tap to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p style={{ fontSize: "12px" }}>
                  Photos, documents, or any files
                </p>
              </div>
            </div>
            <div className="submit-container">
              <SubmitButton text="Submit report" />
            </div>
          </div>
        ) : (
          ""
        )}
        <div className={activeTab === 2 ? "re-container" : "hid"}>
          {/*i know this isnt right but i'm tired*/}
          Reports are saved automatically and synced across devices
        </div>
      </div>
    </div>
  );
};

export default App;
