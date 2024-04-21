import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "../../Container";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [admin, setAdmin] = useState({
    role: "",
    name: "",
    email: "",
    password: "",
    sem: "",
    department: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [rola, setrole] = useState("");
  const role = useParams();
  // setrole(rola);
  console.log("chadr", role);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    let decodedToken = null;
    if (typeof token === "string") {
      try {
        decodedToken = jwtDecode(token);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    const decoded = jwtDecode(token);
    console.log("tori vega", decoded);
    const fetchdetails = async () => {
      console.log(decoded);
      const response = await axios.get(
        `http://localhost:8080/fetchuserdeetail/${JSON.stringify(decoded)}`
      );
      console.log("maal agya , mall agya", response);
      setAdmin((prevAdmin) => ({
        ...prevAdmin,
        email: response.data[0].email,
        name: response.data[0].name,
        role: response.data[0].role,
        sem: response.data[0].sem,
        department: response.data[0].department,
      }));
    };
    fetchdetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement the logic to update the admin's profile in your backend
    console.log(admin);
    // After updating, you might want to set isEditing back to false
    setIsEditing(false);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Container>
      <div className="container h-100 mt-5">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-header text-center">
                <h3>{rola} Profile</h3>
              </div>
              <div className="card-body">
                {isEditing ? (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="role">Role</label>
                      <input
                        type="text"
                        name="role"
                        value={admin.role}
                        onChange={handleChange}
                        className="form-control"
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={admin.name}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={admin.email}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={admin.password}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mt-2"
                    >
                      Update Profile
                    </button>
                  </form>
                ) : (
                  <div>
                    <p>Role: {admin.role}</p>
                    <p>Name: {admin.name}</p>
                    <p>Email: {admin.email}</p>
                    {admin.role === "student" && <p> Sem: {admin.sem}</p>}
                    {admin.role === "teacher" && (
                      <p> Department: {admin.department}</p>
                    )}
                    <button
                      onClick={toggleEditMode}
                      className="btn btn-secondary mt-3"
                    >
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
