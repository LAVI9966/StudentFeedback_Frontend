import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddFaculty = ({ _id }) => {
  const [facultyData, setFacultyData] = useState({
    name: "",
    email: "",
    department: "",
    courseId: _id,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!facultyData.name || !facultyData.email || !facultyData.department) {
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
      const response = await axios.post(
        `https://studentfeedback-backend.onrender.com/addfaculty`,
        facultyData,
        {
          headers: {
            Authorization: `Breazer${token}`,
          },
        }
      );
      console.log(response);
      toast.success("Faculty Successfully Added!", {
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
        toast.error(`Faculty is Present With this Email`);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacultyData({ ...facultyData, [name]: value });
    console.log(e.target.value);
  };

  return (
    <>
      <div className="card">
        <div className="card-header">Add Faculty</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Faculty Name:</label>
              <input
                type="text"
                value={facultyData.name}
                name="name"
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={facultyData.email}
                name="email"
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Department:</label>
              <input
                type="text"
                value={facultyData.department}
                name="department"
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary mt-2">
              Add Faculty
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
        transition={Bounce}
      />
    </>
  );
};

export default AddFaculty;
