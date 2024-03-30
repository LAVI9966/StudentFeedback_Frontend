import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
const DisplayFacultyList = ({ _id }) => {
  console.log("lolo", _id);
  const [facultyList, setFacultyList] = useState([]);

  const handleDelete = async (facultyId) => {
    console.log("hd me se ", facultyId);
    try {
      await axios.delete(`http://localhost:8080/deletefaculty/${facultyId}`);
      toast.success("Faculty member deleted successfully!", {
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
      toast.error("An error occurred while deleting the faculty member.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: "bounce",
      });
    }
  };
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await axios.get(
          `${window.location.origin}/fetchfaculty/${_id}`
        );
        setFacultyList(response.data);
      } catch (error) {
        console.error("Error fetching faculty list:", error);
      }
    };

    fetchFaculty();
  }, [handleDelete]);
  return (
    <>
      <div className="card">
        <div className="card-header">Faculty List</div>
        <div className="card-body">
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Faculty Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {facultyList.map((faculty) => (
                  <tr key={faculty.id}>
                    <td>{faculty.name}</td>
                    <td>{faculty.email}</td>
                    <td>{faculty.department}</td>
                    <td>
                      <Link>
                        <button
                          className="btn btn-danger btn-sm mr-2"
                          onClick={() => handleDelete(faculty._id)}
                        >
                          Delete
                        </button>
                      </Link>
                    </td>
                    <td>
                      <Link to={`/facultyratingshow/${faculty._id}`}>
                        <button className="btn btn-primary btn-sm">
                          Show Ratings
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayFacultyList;
