import React from "react";

const Tabs = ({ tabs }) => {
  return (
    <div className="tab-container">
      {tabs.map((tab, key) => {
        return (
          <div className="tab" key={key}>
            {tab.logo}
            {tab.text}
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
