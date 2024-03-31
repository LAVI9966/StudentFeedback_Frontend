import React, { useEffect, useState } from "react";
import Container from "../../Container";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

const CourseList = () => {
  const [courselist, setcourselist] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const token = localStorage.getItem("authToken");
  let decodedToken = null;
  if (typeof token === "string") {
    try {
      decodedToken = jwtDecode(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      // Handle the error appropriately, e.g., by setting decodedToken to null or an empty object
    }
  }
  const decoded = jwtDecode(token);
  const studentdata = {
    id: decoded.id,
    sem: decoded.sem,
  };
  console.log("Courselist page se", studentdata);
  useEffect(() => {
    const fetch = async () => {
      const responce = await axios.post(
        `https://studentfeedback-backend.onrender.com/fetchcourse`,
        studentdata
      );
      setcourselist(responce.data);
      console.log("hygy", responce.data);
    };
    fetch();
  }, []);

  return (
    <Container>
      <div className="container py-5">
        <div className="row ">
          {courselist.map((course, index) => (
            <div key={index} className="col-lg-4  col-md-6 mb-4">
              <div
                className="card  shadow-lg border border-secondary rounded-lg overflow-hidden"
                style={{
                  backgroundColor:
                    hoveredIndex === index ? "#f8f9fa" : "transparent",
                }}
              >
                <div className="  card-body">
                  <h1 className="card-title mb-3">{course.name}</h1>
                  <p className=" card-text mb-2">
                    <small className="font-weight-bold">
                      Course Code: {course.code}
                    </small>
                  </p>
                  <p className=" card-text mb-2">
                    <small className="font-weight-bold">
                      Semester: {course.semester}
                    </small>
                  </p>
                  <p className=" card-text">
                    <small className="font-weight-bold">
                      Duration: {course.duration} Weeks
                    </small>
                  </p>
                </div>
                <div className="card-footer bg-transparent border-top-0">
                  <Link
                    to={`/submitratingpage/${course._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Rate Course
                    {console.log("tori rio ", course._id)}
                  </Link>
                  <Link
                    to={`/facultylist/${course._id}`}
                    className="btn btn-secondary btn-sm ms-2"
                  >
                    View Faculty
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default CourseList;
