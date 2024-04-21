import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import "./App.css";
import Home from "./Home";
import "bootstrap/dist/css/bootstrap.css";
import Signup from "./Component/auth/Signup";
import CourseList from "./Component/Student/CourseList";
import Protected from "./Component/ProtectedRoutes/Protected";
import CourseRatingPage from "./Component/Student/SubmitRatingPage";
import FacultyList from "./Component/Student/FacultyList";
import SubmitRatingPage from "./Component/Student/SubmitRatingPage";
import Login from "./Component/auth/Login";
import Adminhome from "./Component/Admin/Adminhome";
import Updatesem from "./Component/Admin/Updatesem";
import AddheadFaculty from "./Component/Admin/AddheadFaculty";
import HeadFaculties from "./Component/Admin/HeadFaculties";
import FacultyHeadHome from "./Component/Faculty/FacultyHeadHome";
import AdddFacultyPage from "./Component/Faculty/AdddFacultyPage";
import SubmitRatingPageFaculty from "./Component/Student/SubmitRatingPageFaculty";
import CourseRatingshow from "./Component/Faculty/CourseRatingshow";
import FacultyRatingshow from "./Component/Faculty/FacultyRatingShow";
import GetStart from "./GetStart";
import Profile from "./Component/Admin/Profile";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GetStart></GetStart>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route
            path="/courselist"
            element={<Protected Component={CourseList} />}
          ></Route>
          <Route
            path="/profile/:role"
            element={<Protected Component={Profile} />}
          ></Route>
          <Route
            path="/submitratingpage/:courseId"
            element={<Protected Component={SubmitRatingPage} />}
          ></Route>
          <Route
            path="/submitfacultyratingpage/:facultyId"
            element={<Protected Component={SubmitRatingPageFaculty} />}
          ></Route>
          <Route
            path="/facultylist/:courseId"
            element={<Protected Component={FacultyList} />}
          ></Route>
          <Route
            path="/adminhome"
            element={<Protected Component={Adminhome} />}
          ></Route>
          <Route
            path="/updatesem"
            element={<Protected Component={Updatesem} />}
          ></Route>
          <Route
            path="/headfaculty"
            element={<Protected Component={HeadFaculties} />}
          ></Route>
          <Route
            path="/facultyheadhome"
            element={<Protected Component={FacultyHeadHome} />}
          ></Route>
          <Route
            path="/showcourserating/:courseId"
            element={<Protected Component={CourseRatingshow} />}
          ></Route>
          <Route
            path="/facultyratingshow/:facultyId"
            element={<Protected Component={FacultyRatingshow} />}
          ></Route>
          <Route
            //course id pass hori he
            path="/addfacultypage/:_id"
            element={<Protected Component={AdddFacultyPage} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
