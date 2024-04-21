import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported
import RatingsDisplay from "./RatingDisplay";
import { Link } from "react-router-dom";
import Container from "../../Container";
import axios from "axios";
const Adminhome = () => {
  return (
    <Container>
      <div className="container mt-5">
        <h1 className="text-center mb-4">Admin Home</h1>
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Update Semester</div>
              <div className="card-body">
                <p>
                  Updates the current semester for all students, applying the
                  new semester to their academic records.
                </p>
                <Link to="/updatesem">
                  <button className="btn btn-primary">Update Semester</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Add Head Faculty</div>
              <div className="card-body">
                <p>
                  Manages faculty levels, including adding lower-level faculty
                  and adding new courses to each faculty member.
                </p>
                <Link to="/headfaculty">
                  <button className="btn btn-primary">Add Head Faculty</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Adminhome;
