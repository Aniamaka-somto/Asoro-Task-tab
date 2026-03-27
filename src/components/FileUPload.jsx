import React, { useState, useRef } from "react";
import { FiUpload, FiX, FiFile } from "react-icons/fi";

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const addFiles = (incoming) => {
    const newFiles = Array.from(incoming).filter(
      (f) => !files.some((existing) => existing.name === f.name),
    );
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (name) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div>
      {/* Drop Zone */}
      <div
        className="attachment-box"
        onClick={() => inputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        style={{
          border: `2px dashed ${isDragging ? "#2d9d92" : "#cbd5e1"}`,
          backgroundColor: isDragging ? "#f0fafa" : "",
          cursor: "pointer",
          transition: "all 0.2s",
        }}
      >
        <FiUpload style={{ color: isDragging ? "#2d9d92" : "inherit" }} />
        <p style={{ fontSize: "14px" }}>
          <span style={{ color: "#2d9d92", fontWeight: "500" }}>
            Tap to upload
          </span>{" "}
          or drag and drop
        </p>
        <p style={{ fontSize: "12px" }}>Photos, documents, or any files</p>

        {/* Hidden input */}
        <input
          ref={inputRef}
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {files.map((file) => (
            <div
              key={file.name}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 12px",
                borderRadius: "8px",
                backgroundColor: "#f1f5f9",
                fontSize: "13px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <FiFile color="#2d9d92" />
                <span style={{ fontWeight: "500" }}>{file.name}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#6c7c93",
                }}
              >
                <span>{formatSize(file.size)}</span>
                <FiX
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation(); // don't trigger the upload click
                    removeFile(file.name);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
