import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Container from "./Container";
import { Link } from "react-router-dom";

const GetStart = () => {
  return (
    <Container>
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className=" col-md-8 mt-5 my-2 col-lg-6 p-5 text-center bg-body-tertiary rounded-3">
            <h1 className="text-body-emphasis">STUDENT~FEEDBACK~SYSTEM</h1>
            <p className="fs-5 text-muted">
              Welcome to our Student Feedback System! Empowering students to
              voice their opinions and enhance their learning experience. Join
              us to share your valuable feedback and shape the future of
              education.
            </p>
            <div className="d-flex gap-2 mb-5 justify-content-center">
              <Link to={"/login"} className="">
                <button
                  className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill"
                  type="button"
                >
                  Login
                  <svg className="bi ms-2" width="24" height="24">
                    <use xlinkHref="#arrow-right-short"></use>
                  </svg>
                </button>
              </Link>
              <Link to={"/signup"} className="">
                <button
                  className="btn btn-warning btn-outline-dark btn-lg px-4 rounded-pill"
                  type="button"
                >
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default GetStart;
