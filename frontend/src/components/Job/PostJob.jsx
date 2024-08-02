// src/components/Job/PostJob.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import toast from "react-hot-toast";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [error, setError] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigate = useNavigate();

  if (!isAuthorized) {
    navigate("/login");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!title || !category || !country || !city || !location || !description) {
      toast.error("Please fill in all required fields!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/job/PostJob",
        {
          title,
          category,
          country,
          city,
          location,
          description,
          fixedSalary,
          salaryFrom,
          salaryTo,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success("Job posted successfully!");
      // Clear form fields
      setTitle("");
      setCategory("");
      setCountry("");
      setCity("");
      setLocation("");
      setDescription("");
      setFixedSalary("");
      setSalaryFrom("");
      setSalaryTo("");

      // Redirect to job listings or any other desired page
      navigate("/jobs");
    } catch (error) {
      setError("An error occurred while posting the job.");
      toast.error(error.response?.data?.message || "An error occurred!");
    }
  };

  return (
    <section className="postJob page">
      <div className="container">
        <h3>Post a New Job</h3>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="inputTag">
            <label>Job Title</label>
            <input
              type="text"
              placeholder="Enter job title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="inputTag">
            <label>Category</label>
            <input
              type="text"
              placeholder="Enter job category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="inputTag">
            <label>Country</label>
            <input
              type="text"
              placeholder="Enter job country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="inputTag">
            <label>City</label>
            <input
              type="text"
              placeholder="Enter job city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="inputTag">
            <label>Location</label>
            <input
              type="text"
              placeholder="Enter job location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="inputTag">
            <label>Description</label>
            <textarea
              placeholder="Enter job description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="inputTag">
            <label>Fixed Salary</label>
            <input
              type="number"
              placeholder="Enter fixed salary (optional)"
              value={fixedSalary}
              onChange={(e) => setFixedSalary(e.target.value)}
            />
          </div>
          <div className="inputTag">
            <label>Salary Range</label>
            <input
              type="number"
              placeholder="From"
              value={salaryFrom}
              onChange={(e) => setSalaryFrom(e.target.value)}
            />
            <input
              type="number"
              placeholder="To"
              value={salaryTo}
              onChange={(e) => setSalaryTo(e.target.value)}
            />
          </div>
          <button type="submit">Post Job</button>
        </form>
      </div>
    </section>
  );
};

export default PostJob;
