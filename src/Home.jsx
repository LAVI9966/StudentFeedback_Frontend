import React from "react";
import Login from "./Component/auth/Login";
import Signup from "./Component/auth/Signup";
import Navbar from "./Component/Features/Navbar";
import Footer from "./Component/Features/Footer";
import Container from "./Container";
const Home = () => {
  return (
    <>
      <Container>
        <Signup></Signup>
      </Container>
    </>
  );
};

export default Home;
