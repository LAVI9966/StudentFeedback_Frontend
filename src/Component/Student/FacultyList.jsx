import React, { useEffect, useState } from "react";
import Container from "../../Container";
import { Link, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
const FacultyList = () => {
  const [facultylist, setFacultylist] = useState([]);
  const token = localStorage.getItem("authToken");
  const decoded = jwtDecode(token);
  const studentdata = {
    id: decoded.id,
    sem: decoded.sem,
  };
  const courseId = useParams();
  console.log("pagal hoye jao", courseId);
  useEffect(() => {
    const fetch = async () => {
      const responce = await axios.post(
        `https://studentfeedback-backend.onrender.com/fetchfaculty`,
        courseId
      );
      setFacultylist(responce.data);
      console.log("hygy", responce.data);
    };
    fetch();
  }, []);
  return (
    <Container>
      <div className="container py-5">
        <div className="row">
          {facultylist.map((faculty, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div
                className="card shadow-lg border border-secondary rounded-lg overflow-hidden"
                style={{
                  backgroundColor: index % 2 === 0 ? "#f8f9fa" : "transparent", // Example hover effect
                }}
              >
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <h1 className="card-title mb-3">{faculty.name}</h1>
                  </div>
                  <p className="card-text mb-2">
                    <small className="font-weight-bold">
                      Title: {faculty.title}
                    </small>
                  </p>
                  <p className="card-text mb-2">
                    <small className="font-weight-bold">
                      Email: {faculty.email}
                    </small>
                  </p>
                  <p className="card-text mb-2">
                    <small className="font-weight-bold">
                      Department: {faculty.department}
                    </small>
                  </p>
                </div>
                <div className="card-footer bg-transparent border-top-0">
                  <Link
                    to={`/submitfacultyratingpage/${faculty._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Rate Faculty
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

export default FacultyList;
