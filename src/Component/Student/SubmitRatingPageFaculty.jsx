import React, { useEffect, useState } from "react";
import Container from "../../Container";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SubmitRatingPageFaculty = () => {
  const token = localStorage.getItem("authToken");
  const decoded = jwtDecode(token);
  const studentdata = {
    id: decoded.id,
    sem: decoded.sem,
  };
  console.log("student data", studentdata);
  const { facultyId } = useParams();
  console.log("agai he ", facultyId);
  const [ratings, setRatings] = useState({
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
    comments: "",
  });

  const [facultyname, setfacultyname] = useState("");
  useEffect(() => {
    const fetchname = async () => {
      const c = await axios.get(
        `https://studentfeedback-backend.onrender.com/fetchfacultyname/${facultyId}`
      );
      const course = c.data;
      setfacultyname(course);
      console.log("chal na", course);
    };
    fetchname();
  }, [token]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRatings((prevRatings) => ({
      ...prevRatings,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !ratings.question1 ||
      !ratings.question2 ||
      !ratings.question3 ||
      !ratings.question4 ||
      !ratings.question5
    ) {
      toast.warn("Provide All data!!", {
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
      return;
    }
    const data = {
      studentId: decoded.id,
      // sem: decoded.sem,
      ratings: ratings,
      facultyId: facultyId,
    };
    console.log("data ", data);
    try {
      const response = await axios.post(
        `https://studentfeedback-backend.onrender.com/submitfacultyrating`,
        data
      );
      console.log(response);
      toast.success("Rating Submitted", {
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
      const maildata = {
        facultyId: facultyId,
      };
      console.log("mail data", maildata);
      const mail = await axios.post(
        `http://localhost:8080/sendmailfaculty`,
        maildata
      );
    } catch (error) {
      console.log(error.message);
      if (error.response.status === 400) {
        toast.error(`You Already Rated`);
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
    console.log(ratings);
  };
  const realq = [
    "How would you rate the Faculty content?",
    "How would you rate the instructor's teaching style?",
    "How would you rate the Faculty difficulty?",
    "How would you rate the Faculty workload?",
    "How would you rate the overall Faculty experience?",
  ];
  return (
    <>
      <Container>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <h2
                className="text-center bg-primary rounded p-1
"
              >
                Submit Your Ratings For {facultyname}
              </h2>
              <form onSubmit={handleSubmit}>
                {[
                  "question1",
                  "question2",
                  "question3",
                  "question4",
                  "question5",
                ].map((question, i) => (
                  <>
                    <div key={question} className="mb-3">
                      <label className="form-label">{realq[i]}</label>
                      <select
                        className="form-select bg-secondary"
                        id={question}
                        name={question}
                        value={ratings[question]}
                        onChange={handleChange}
                      >
                        <option value="">Select a rating</option>
                        <option value="1">1 - Very Poor</option>
                        <option value="2">2 - Poor</option>
                        <option value="3">3 - Average</option>
                        <option value="4">4 - Good</option>
                        <option value="5">5 - Excellent</option>
                      </select>
                    </div>
                  </>
                ))}
                <div className="mb-3">
                  <label htmlFor="comments" className="form-label">
                    Comments
                  </label>
                  <textarea
                    className="form-control"
                    id="comments"
                    name="comments"
                    value={ratings.comments}
                    onChange={handleChange}
                    rows="3"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
    </>
  );
};

export default SubmitRatingPageFaculty;
