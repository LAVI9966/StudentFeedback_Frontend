import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Container from "./Container";
import { Link } from "react-router-dom";

const GetStart = () => {
  return (
    <Container>
      <div class="container my-4">
        <div class="p-5 text-center bg-body-tertiary rounded-3">
          <svg
            class="bi mt-4 mb-3"
            style={{ color: " var(--bs-indigo);" }}
            width="100"
            height="100"
          >
            <use xlinkHref="#bootstrap"></use>
          </svg>
          <h1 class="text-body-emphasis">STUDENT~FEEDBACK~SYSTEM</h1>
          <p class="col-lg-8 mx-auto fs-5 text-muted">
            Welcome to our Student Feedback System! Empowering students to voice
            their opinions and enhance their learning experience. Join us to
            share your valuable feedback and shape the future of education.
          </p>
          <div class="d-inline-flex gap-2 mb-5">
            <Link to={"/login"} className="">
              <button
                class="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill"
                type="button"
              >
                Login
                <svg class="bi ms-2" width="24" height="24">
                  <use xlinkHref="#arrow-right-short"></use>
                </svg>
              </button>
            </Link>
            <Link to={"/signup"} className="">
              <button
                class="btn btn-warning btn-outline-dark btn-lg px-4 rounded-pill"
                type="button"
              >
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default GetStart;
