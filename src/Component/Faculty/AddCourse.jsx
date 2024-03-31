import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const AddCourse = ({ facultyid }) => {
  const [coursedata, setCoursedata] = useState({
    name: "",
    code: "",
    semester: "",
    duration: "",
    headfacultyId: facultyid,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !coursedata.name ||
      !coursedata.code ||
      !coursedata.semester ||
      !coursedata.duration
    ) {
      toast.warn("Provide All data!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
    try {
      const token = localStorage.getItem("authToken");
      console.log(coursedata);
      const response = await axios.post(
        `https://studentfeedback-backend.onrender.com/addcourse`,
        coursedata,
        {
          headers: {
            Authorization: `Bearer${token}`,
          },
        }
      );

      console.log("addcourse se ", response);
      toast.success("Course Successfully Addednot!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } catch (error) {
      console.log(error.message);
      if (error.response.status === 422) {
        toast.error(`Email Already Exists`);
      } else if (error.response.status === 400) {
        toast.error(`Course is Present With this code`);
      } else if (error.response.status === 500) {
        toast.error(`Internal server error`);
      } else if (error.request) {
        console.log(error.request);
        toast.error("No response received from the server.");
      } else {
        console.log("Error", error.message);
        toast.error("An error occurred during signup.");
      }
    }
  };
  const handlechange = (e) => {
    const { name, value } = e.target;
    setCoursedata({ ...coursedata, [name]: value });
    console.log(e.target.value);
  };

  return (
    <>
      <div className="card">
        <div className="card-header">Add Course</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Course Name:</label>
              <input
                type="text"
                value={coursedata.name}
                name="name"
                onChange={handlechange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Course Code:</label>
              <input
                type="text"
                value={coursedata.code}
                name="code"
                onChange={handlechange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Semester:</label>
              <select
                className="form-control bg-primary text-white"
                id="role"
                value={coursedata.sem}
                onChange={handlechange}
                name="semester"
              >
                <option value="">Select Semester</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
            </div>
            <div className="form-group">
              <label>Duration:</label>
              <input
                type="text"
                value={coursedata.duration}
                name="duration"
                onChange={handlechange}
                className="form-control"
              />
            </div>

            <button type="submit" className="btn btn-primary mt-2">
              Add Course
            </button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
    </>
  );
};

export default AddCourse;
