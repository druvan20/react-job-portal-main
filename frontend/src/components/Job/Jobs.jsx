import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import "./Jobs.css"; // Import the CSS file for styles

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Mock API response
        const mockResponse = {
          data: {
            jobs: [
              {
                _id: "1",
                title: "Software Engineer",
                category: "Technology",
                country: "USA",
                city: "New York",
                location: "Remote",
                description: "Develop and maintain software applications.",
                jobPostedOn: "2024-08-01",
                fixedSalary: "$120,000",
              },
              {
                _id: "2",
                title: "Graphic Designer",
                category: "Design",
                country: "UK",
                city: "London",
                location: "Hybrid",
                description: "Create visual concepts for various projects.",
                jobPostedOn: "2024-07-15",
                salaryFrom: "$50,000",
                salaryTo: "$60,000",
              },
              {
                _id: "3",
                title: "Project Manager",
                category: "Management",
                country: "Canada",
                city: "Toronto",
                location: "On-site",
                description: "Oversee project planning and execution.",
                jobPostedOn: "2024-06-30",
                fixedSalary: "$90,000",
              },
            ],
          },
        };
        setJobs(mockResponse.data);
      } catch (error) {
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (!isAuthorized) {
    navigateTo("/");
    return null; // Avoid rendering while redirecting
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="jobs page">
      <div className="container">
        <h3>ALL AVAILABLE JOBS</h3>
        <div className="job-list">
          {jobs.jobs && jobs.jobs.length > 0 ? (
            jobs.jobs.map((element) => (
              <div className="job-card" key={element._id}>
                <h4>{element.title}</h4>
                <p>
                  <strong>Category:</strong> {element.category}
                </p>
                <p>
                  <strong>Country:</strong> {element.country}
                </p>
                <p>
                  <strong>City:</strong> {element.city}
                </p>
                <p>
                  <strong>Location:</strong> {element.location}
                </p>
                <p>
                  <strong>Description:</strong> {element.description}
                </p>
                <p>
                  <strong>Posted On:</strong> {element.jobPostedOn}
                </p>
                <p>
                  <strong>Salary:</strong>{" "}
                  {element.fixedSalary ||
                    `${element.salaryFrom} - ${element.salaryTo}`}
                </p>
                <Link to={`/job/${element._id}`} className="job-details-link">
                  Job Details
                </Link>
              </div>
            ))
          ) : (
            <p>No jobs available at the moment.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
