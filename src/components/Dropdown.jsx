import React, { useState, useRef, useEffect } from "react";
import "../App.css";

const Dropdown = ({ option, placeholder = "Select a project" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (opt) => {
    setSelected(opt);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        <span className={selected ? "selected-text" : "placeholder-text"}>
          {selected || placeholder}
        </span>
        <span className={`arrow ${isOpen ? "open" : ""}`}>
          <svg width="12" height="8" viewBox="0 0 18 7" fill="none">
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>

      {isOpen && (
        <div className="dropdown-list">
          {option.map((opt) => (
            <div
              key={opt}
              className={`dropdown-item ${
                selected === opt ? "selected-item" : ""
              }`}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Dropdown;
