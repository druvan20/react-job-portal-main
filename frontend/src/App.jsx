import React, { useEffect, useContext } from "react";
import "./App.css";
import { Context } from "./main";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../src/components/Auth/Login";
import Register from "../src/components/Auth/Register";
import Navbar from "../src/components/Layout/Navbar";
import Footer from "../src/components/Layout/Footer";
import Home from "../src/components/Home/Home";
import Jobs from "../src/components/Job/Jobs";
import JobDetails from "../src/components/Job/JobDetails";
import PostJob from "../src/components/Job/PostJob";
import MyJobs from "../src/components/Job/MyJobs";
import Application from "./components/Application/Application";
import MyApplication from "./components/Application/MyApplication";
import NotFound from "./components/NotFound/NotFound";
import axios from "axios";
import { Toaster } from "react-hot-toast";

function App() {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/user/getuser",
          { withCredentials: true }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [setIsAuthorized, setUser]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/job/getall" element={<Jobs />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route
          path="/job/post"
          element={isAuthorized ? <PostJob /> : <Navigate to="/login" />}
        />
        <Route
          path="/job/me"
          element={isAuthorized ? <MyJobs /> : <Navigate to="/login" />}
        />
        <Route
          path="/application/:id"
          element={isAuthorized ? <Application /> : <Navigate to="/login" />}
        />
        <Route
          path="/application/me"
          element={isAuthorized ? <MyApplication /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
}

export default App;
