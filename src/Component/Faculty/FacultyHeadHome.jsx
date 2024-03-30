import React from "react";
import Container from "../../Container";
import AddCourse from "./AddCourse";
import DisplayCourseList from "./DisplayCourseList";
import { jwtDecode } from "jwt-decode";

const FacultyHeadHome = () => {
  const token = localStorage.getItem("authToken");
  const decoded = jwtDecode(token);
  const id = decoded.id;
  return (
    <Container>
      <div className="container p-5 ">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card">
              <AddCourse facultyid={id} />
            </div>
          </div>
          <div className="col-md-8 ">
            <div className="card">
              <DisplayCourseList facultyid={id} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FacultyHeadHome;
