import React from "react";
import "../App.css";

export const CounterButton = ({ text, onClick }) => {
  return (
    <div className="counter-button" onClick={onClick}>
      {text}
    </div>
  );
};

export const SubmitButton = ({ text, onClick }) => {
  return (
    <div className="submit-button" onClick={onClick}>
      {text}
    </div>
  );
};

export const StatusButton = ({ text, onClick }) => {
  return (
    <div className="status-button" onClick={onClick}>
      {text}
    </div>
  );
};
