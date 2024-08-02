// src/components/Job/MyJobs.jsx
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
      return;
    }

    const fetchMyJobs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/job/MyJobs`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setMyJobs(response.data.jobs); // Assume the API returns jobs in a 'jobs' field
      } catch (error) {
        console.log("Error fetching jobs:", error);
        // You can handle error state or redirection based on the error
      }
    };

    fetchMyJobs();
  }, [isAuthorized, navigateTo]);

  return (
    <section className="MyJobs page">
      <div className="container">
        <h3>My Jobs</h3>
        <div className="banner">
          {myJobs.length > 0 ? (
            myJobs.map((job) => (
              <div className="card" key={job._id}>
                <p>{job.title}</p>
                <p>{job.category}</p>
                <p>{job.country}</p>
                <Link to={`/job/${job._id}`}>View Job Details</Link>
              </div>
            ))
          ) : (
            <p>No jobs found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyJobs;
