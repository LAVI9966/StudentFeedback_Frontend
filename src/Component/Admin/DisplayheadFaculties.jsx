import axios from "axios";
import React, { useEffect, useState } from "react";

const DisplayheadFaculties = () => {
  const [headList, setheadlist] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `https://studentfeedback-backend.onrender.com/fetchhead`
        );
        setheadlist(response.data);
      } catch (error) {
        console.error("Error fetching head faculties:", error);
      }
    };
    fetch();
  }, [headList, setheadlist]);

  const handleDelete = async (facultyId) => {
    try {
      await axios.delete(
        `https://studentfeedback-backend.onrender.com/deletehead/${facultyId}`
      );
      setheadlist(headList.filter((faculty) => faculty._id !== facultyId));
      toast.success("Faculty Head Added Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } catch (error) {
      console.log(error.message);
      if (error.response.status === 422) {
        toast.error(`Email Already Exists`);
      } else if (error.response.status === 401) {
        toast.error(`Invalid credentials`);
      } else if (error.response.status === 500) {
        toast.error(`Internal server error`);
      } else if (error.request) {
        console.log(error.request);
        toast.error("No response received from the server.");
      } else {
        console.log("Error", error.message);
        toast.error("An error occurred during signup.");
      }
    }
  };

  return (
    <div className="card">
      <div className="card-header">Faculty List</div>
      <div className="card-body">
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>S.no</th>
                <th>Name</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {headList.map((faculty, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{faculty.name}</td>
                  <td>{faculty.department}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(faculty._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DisplayheadFaculties;
