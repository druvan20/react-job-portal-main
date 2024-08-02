import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MyApplication.css";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/user/applications",
          { withCredentials: true }
        );
        setApplications(response.data.applications);
      } catch (error) {
        setError("Failed to load applications. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <div>Loading your applications...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="my-applications page">
      <div className="container">
        <h3>My Applications</h3>
        <div className="application-list">
          {applications.length > 0 ? (
            applications.map((app) => (
              <div className="application-card" key={app._id}>
                <h4>{app.jobTitle}</h4>
                <p>
                  <strong>Company:</strong> {app.company}
                </p>
                <p>
                  <strong>Applied On:</strong> {app.dateApplied}
                </p>
                <Link
                  to={`/application/${app._id}`}
                  className="view-details-link"
                >
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <p>No applications found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyApplications;
