import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Container from "../../Container";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from '@mui/material/CircularProgress';
const Login = () => {
  const [isLoading, setisLoading] = useState(false);

  const navigation = useNavigate();
  const [formData, setFormdata] = useState({
    role: "",
    email: "",
    password: "",
  });
  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formData, [name]: value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
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
    console.log(formData);
    setisLoading(true);
    try {
      const response = await axios.post(
        `https://studentfeedback-backend.onrender.com/login`,
        formData
      );
      localStorage.setItem("authToken", response.data.token);
      console.log(response);
      if (formData.role === "student") {
        navigation("/courselist");
      } else if (formData.role === "admin") {
        navigation("/adminhome");
      } else if (formData.role === "teacher") {
        navigation("/facultyheadhome");
      }
      console.log(response);
    } catch (error) {
      console.log(error.message);
      if (error.response.status === 404) {
        toast.error(`User Not Found`);
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
  };
  return (
    <>
      <Container>
        <div className="container h-100 mt-5 mb-0 custom-padding">
          <div className="row justify-content-center align-items-center ">
            <div className="col-md-4">
              <div className="card shadow">
                <div className="card-header text-center">
                  <h3>Login</h3>
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
                        name="role"
                        value={formData.role}
                        onChange={handlechange}
                      >
                        <option value="">Select Role</option>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="username" className="p-1">
                        Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="email"
                        value={formData.email}
                        onChange={handlechange}
                        placeholder="Enter email"
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
                        onChange={handlechange}
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
                      <CircularProgress />
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

export default Login;
