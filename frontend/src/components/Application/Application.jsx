import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Applications.css";

const Application = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/job/${jobId}`,
          {
            withCredentials: true,
          }
        );
        setJob(response.data.job);
      } catch (error) {
        console.error("Error fetching job:", error);
        setError("Failed to load job details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        `http://localhost:8080/api/v1/job/${jobId}/apply`,
        {
          name: applicantName,
          email: applicantEmail,
          coverLetter,
        },
        { withCredentials: true }
      );
      setSuccess("Application submitted successfully!");
      setApplicantName("");
      setApplicantEmail("");
      setCoverLetter("");
    } catch (error) {
      console.error("Error submitting application:", error);
      setError("Failed to submit application. Please try again later.");
    }
  };

  if (loading) {
    return <div>Loading job details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!job) {
    return <div>Job not found.</div>;
  }

  return (
    <section className="application page">
      <div className="container">
        <h3>Apply for {job.title}</h3>
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="applicantName">Name:</label>
            <input
              type="text"
              id="applicantName"
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="applicantEmail">Email:</label>
            <input
              type="email"
              id="applicantEmail"
              value={applicantEmail}
              onChange={(e) => setApplicantEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="coverLetter">Cover Letter:</label>
            <textarea
              id="coverLetter"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit Application</button>
        </form>
      </div>
    </section>
  );
};

export default Application;
