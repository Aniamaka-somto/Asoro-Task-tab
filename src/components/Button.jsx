import React from "react";
import "../App.css";

const Button = ({ text, onClick }) => {
  return (
    <div className="counter-button" onClick={onClick}>
      {text}
    </div>
  );
};

export default Button;
