import React, { useState } from "react";
import Container from "../../Container";
import axios from "axios";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UpdateSemester = () => {
  const [bothsem, setbothSem] = useState({
    currsem: "",
    newsem: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setbothSem({ ...bothsem, [name]: value });
  };

  const handlesubmit = async (e) => {
    const token = localStorage.getItem("authToken");
    e.preventDefault();
    console.log(bothsem);
    try {
      const response = await axios.post(
        `${window.location.origin}/updatesem`,
        bothsem,
        {
          headers: {
            Authorization: `Breazer${token}`,
          },
        }
      );
      toast.success("Semester Update Success", {
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
      console.log(response);
    } catch (error) {}
  };
  return (
    <>
      <Container>
        <div className="container h-100 mt-5">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h3>Update Semester</h3>
                </div>
                <div className="card-body">
                  <form onSubmit={handlesubmit}>
                    <div className="form-group">
                      <label htmlFor="currentSem">Current Semester:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="currentSem"
                        name="currsem"
                        value={bothsem.currsem}
                        onChange={handlechange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="newSem">New Semester:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="newSem"
                        name="newsem"
                        value={bothsem.newsem}
                        onChange={handlechange}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3 ">
                      Update
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default UpdateSemester;
