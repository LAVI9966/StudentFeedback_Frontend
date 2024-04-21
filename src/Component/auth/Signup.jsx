import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "../../Container";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { DNA } from 'react-loader-spinner'


const Signup = () => {
  const [isLoading, setisLoading] = useState(false);

  const navigation = useNavigate();
  const [formData, setFormdata] = useState({
    role: "",
    sem: "",
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;

    setFormdata({ ...formData, [name]: value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.role ||
      !formData.email ||
      !formData.password ||
      !formData.name
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
      return;
    }
    if (formData.role === "student") {
      setisLoading(true);
      try {
        const response = await axios.post(
          `https://studentfeedback-backend.onrender.com/signup`,
          formData
        );
        // Example of storing the JWT token in local storage
        toast("Yesss! Registered");
        console.log(response);
        localStorage.setItem("authToken", response.data.token);
        navigation("/courselist");
        const t = localStorage.getItem("authToken");
        console.log(t);
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
      } finally {
        setisLoading(false);
      }
    } else if (formData.role === "admin") {
      setisLoading(true);
      try {
        const datatosend = {
          role: formData.role,
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };
        const response = await axios.post(
          `https://studentfeedback-backend.onrender.com/signup`,
          datatosend
        );
        toast("Yesss! Registered");
        console.log(response);
        localStorage.setItem("authToken", response.data.token);
        navigation("/adminhome");
        const t = localStorage.getItem("authToken");
        console.log(t);
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
      } finally {
        setisLoading(false);
      }
    }
  };

  return (
    <>
      {" "}
      <Container>
        <div className="container h-100 mt-5">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-md-4">
              <div className="card shadow">
                <div className="card-header text-center">
                  <h3>Signup</h3>
                </div>
                <div className="card-body">
                  <form onSubmit={handlesubmit}>
                    <div className="form-group">
                      <label htmlFor="role" className="p-1">
                        Role
                      </label>
                      <select
                        className="form-control bg-primary text-white"
                        id="role"
                        value={formData.role}
                        onChange={handleChange}
                        name="role"
                      >
                        <option value="">Select Role</option>
                        <option value="student">Student</option>
                        {/* <option value="teacher">Teacher</option> */}
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    {formData.role !== "admin" ? (
                      <div className="form-group">
                        <label htmlFor="role" className="p-1">
                          Semester
                        </label>
                        <select
                          className="form-control bg-primary text-white"
                          id="role"
                          value={formData.sem}
                          onChange={handleChange}
                          name="sem"
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
                    ) : null}
                    <div className="form-group">
                      <label htmlFor="username" className="p-1">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        name="name"
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
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter Email"
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
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mt-2"
                      style={{ width: "100%" }}
                      disabled={isLoading}
                    >
                      Submit
                    </button>
                  </form>
                  {isLoading && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                      <DNA
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
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

export default Signup;
