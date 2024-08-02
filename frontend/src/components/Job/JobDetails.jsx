import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import "./JobDetail.css";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/job/${id}`,
          { withCredentials: true }
        );
        setJob(response.data.job);
      } catch (error) {
        navigateTo("/notfound");
      }
    };

    fetchJob();
  }, [id, navigateTo]);

  if (!isAuthorized) {
    navigateTo("/login");
    return null;
  }

  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>Job Details</h3>
        <div className="banner">
          <p>
            Title: <span>{job.title}</span>
          </p>
          <p>
            Category: <span>{job.category}</span>
          </p>
          <p>
            Country: <span>{job.country}</span>
          </p>
          <p>
            City: <span>{job.city}</span>
          </p>
          <p>Description:</p>
          <p>{job.description}</p>
          <p>
            Salary: <span>{job.salary}</span>
          </p>
        </div>
        <div className="buttons">
          <Link to={`/application/${id}`} className="apply-button">
            Apply Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
