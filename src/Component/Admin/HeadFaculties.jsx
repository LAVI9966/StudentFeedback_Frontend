import React from "react";
import AddheadFaculty from "./AddheadFaculty";
import DisplayheadFaculties from "./DisplayheadFaculties";
import Container from "../../Container";
const HeadFaculties = () => {
  return (
    <Container>
      {/* <div className="container  mt-5 p-5">
        <div className="row">
          <div className="col-lg-6  d-flex justify-content-center align-items-center">
            <AddheadFaculty />
            </div>
            <div className="col-lg-6 d-flex justify-content-center align-items-center ">
            <DisplayheadFaculties />
            </div>
            </div>
          </div> */}
      <div className="container p-5 ">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <AddheadFaculty />
          </div>
          <div className="col-md-8 ">
            <div className="card">
              <DisplayheadFaculties />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HeadFaculties;
