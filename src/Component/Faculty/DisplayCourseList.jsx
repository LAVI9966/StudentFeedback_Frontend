import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const DisplayCourseList = ({ facultyid }) => {
  const [fetchedcourse, setfetchedcourse] = useState([]);

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(
        `https://studentfeedback-backend.onrender.com/deletecourse/${courseId}`
      );
      toast.success("Course deleted successfully!", {
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
      toast.error("An error occurred while deleting the course.", {
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
    const fetch = async () => {
      try {
        const response = await axios.get(
          `https://studentfeedback-backend.onrender.com/fetchcourse/${facultyid}`
        );
        setfetchedcourse(response.data);
        console.log("display course list:", response.data);
      } catch (error) {
        console.error("Error fetching course list:", error);
      }
    };
    fetch();
  });

  return (
    <div className="card">
      <div className="card-header">Course List</div>
      <div className="card-body">
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Course Code</th>
                <th>Semester</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fetchedcourse.map((course) => (
                <tr key={course._id}>
                  <td>{course.name}</td>
                  <td>{course.code}</td>
                  <td>{course.semester}</td>
                  <td>{course.duration}</td>
                  <td>
                    <Link>
                      <button
                        className="btn btn-danger btn-sm mr-2"
                        onClick={() => handleDelete(course._id)}
                      >
                        Delete
                      </button>
                    </Link>
                    <Link to={`/addfacultypage/${course._id}`}>
                      <button className="btn btn-primary btn-sm">
                        Add Faculty
                      </button>
                    </Link>
                    <Link to={`/showcourserating/${course._id}`}>
                      <button className="btn btn-info btn-sm">
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
  );
};

export default DisplayCourseList;
