import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { VscFeedback } from "react-icons/vsc";
import { GiThunderball } from "react-icons/gi";
import { jwtDecode } from "jwt-decode";
<VscFeedback />;
const Navbar = () => {
  const [role, setRole] = useState("none"); // Use state for role
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decoded = jwtDecode(token);
      console.log(decoded);
      // Assuming the decoded token contains a 'role' property
      setRole(decoded.role); // Update role based on decoded token
    }
  }, []); // Empty dependency array means this effect runs once on mount
  const deleteToken = () => {
    localStorage.removeItem("authToken");
    console.log("Token deleted");
    setRole("none"); // Update role to "none" to reflect logout
    navigate("/"); // Redirect to login page
    window.location.reload();
  };
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between"
      style={{ backgroundColor: "#343a40" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          𝙎𝙏𝙪𝘿𝙚𝙉𝙏𝙁𝙚𝙚𝙙𝘽𝘼𝘾𝙠𝙎𝙮𝙎𝙏𝙚𝙈
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {role === "student" && (
              <li className="nav-item">
                <Link to="/courselist" className="btn text-light">
                  Courselist
                </Link>
              </li>
            )}{" "}
            {role === "admin" && (
              <li className="nav-item">
                <Link to="/adminhome" className="btn text-light">
                  Home
                </Link>
              </li>
            )}
            {role === "admin" && (
              <li className="nav-item">
                <Link to="/updatesem" className="btn text-light">
                  Update Semester
                </Link>
              </li>
            )}
            {role === "admin" && (
              <li className="nav-item">
                <Link to="/headfaculty" className="btn text-light">
                  Add Head Faculty
                </Link>
              </li>
            )}
            {role === "teacher" && (
              <li className="nav-item">
                <Link to="/facultyheadhome" className="btn text-light">
                  Add Course
                </Link>
              </li>
            )}
            {/* {role === "teacher" && (
              <li className="nav-item">
                <Link to="" className="btn text-light">
                  Delete Faculty
                </Link>
              </li>
            )} */}
            {role === "none" && (
              <li className="nav-item">
                <Link to="" className="btn text-light">
                  About
                </Link>
              </li>
            )}
            {role === "none" && (
              <li className="nav-item">
                <Link to="" className="btn text-light">
                  Contact
                </Link>
              </li>
            )}
            {role === "none" && (
              <li className="nav-item">
                <Link to="/login" className="btn text-light">
                  Login
                </Link>
              </li>
            )}
            {role === "none" && (
              <li className="nav-item">
                <Link to="/signup" className="btn text-light">
                  Signup
                </Link>
              </li>
            )}
            {role !== "none" && (
              <li className="nav-item">
                <Link onClick={deleteToken} className="btn text-light">
                  Logout
                </Link>
              </li>
            )}
            {/*role !== "none" && (
              <li className="nav-item">
                <Link to={`/profile/${role}`} className="btn text-light">
                  Profile
                </Link>
              </li>
            )*/}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
