import React, { useState } from "react";
import axios from "axios";
import "./ResumeModal.css";

const ResumeModal = ({ showModal, onClose }) => {
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (event) => {
    setResume(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!resume) {
      setError("Please select a resume file.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      await axios.post(
        "http://localhost:8080/api/v1/user/upload-resume",
        formData,
        { withCredentials: true }
      );
      setSuccess("Resume uploaded successfully!");
      setResume(null);
    } catch (error) {
      setError("Failed to upload resume. Please try again later.");
    }
  };

  if (!showModal) return null;

  return (
    <div className="resume-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Upload Resume</h2>
        {success && <div className="success-message">{success}</div>}
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default ResumeModal;
