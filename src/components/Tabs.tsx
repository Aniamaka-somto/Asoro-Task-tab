import React from "react";

const Tabs = ({ tabs, onClick, activTab }) => {
  return (
    <div className="tab-container">
      {tabs.map((tab, key) => {
        return (
          <div
            className={`tab ${activTab === key ? "active" : ""}`}
            key={key}
            onClick={() => onClick(key)}
          >
            {tab.logo}{" "}
            <span className={key === 0 ? "review" : "hidden"}>{tab.text}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
