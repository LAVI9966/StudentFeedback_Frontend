import React from "react";
import Container from "../../Container";
import AddFaculty from "./AddFaculty";
import DisplayFacultylist from "./DisplayFacultylist";
import { useParams } from "react-router-dom";
const AdddFacultyPage = () => {
  const { _id } = useParams();
  console.log("course ki id he ", _id);
  return (
    <Container>
      <div className="container p-5 ">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card">
              <AddFaculty _id={_id}></AddFaculty>
            </div>
          </div>
          <div className="col-md-8 ">
            <div className="card">
              <DisplayFacultylist _id={_id}></DisplayFacultylist>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AdddFacultyPage;
