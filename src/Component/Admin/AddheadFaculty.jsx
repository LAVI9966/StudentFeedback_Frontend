import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GiEvilLove } from "react-icons/gi";
import axios from "axios";

const AddheadFaculty = () => {
  const [formData, setFormdata] = useState({
    role: "teacher",
    name: "",
    email: "",
    department: "",
    password: "",
  });

  const handlechange = (event) => {
    // Here you can add the logic to submit the form data
    const { name, value } = event.target;
    setFormdata({ ...formData, [name]: value });
  };

  const handlesubmit = async (e) => {
    const token = localStorage.getItem("authToken");
    console.log(token);
    if (!formData.role || !formData.email || !formData.password) {
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
      return;
    }
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://studentfeedback-backend.onrender.com/addheadfaculty`,
        formData,
        {
          headers: {
            Authorization: `Bearer${token}`,
          },
        }
      );
      console.log(response);
      console.log("Added");
      toast.success("Faculty Head Added Successfully!", {
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
      } else if (error.response.status === 401) {
        toast.error(`Invalid credentials`);
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

  return (
    <>
      <div className="card">
        <div className="card-header">Add Head Faculty</div>
        <div className="card-body">
          <form onSubmit={handlesubmit}>
            <div className="form-group">
              <label htmlFor="name" className="p-1">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={formData.name}
                name="name"
                onChange={handlechange}
                placeholder="Enter name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="p-1">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={formData.email}
                name="email"
                onChange={handlechange}
                placeholder="Enter Email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="department" className="p-1">
                Department
              </label>
              <input
                type="department"
                className="form-control"
                id="department"
                value={formData.department}
                name="department"
                onChange={handlechange}
                placeholder="Enter Department"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="p-1">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={formData.password}
                name="password"
                onChange={handlechange}
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block mt-2"
              style={{ width: "100%" }}
            >
              Submit
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

export default AddheadFaculty;
