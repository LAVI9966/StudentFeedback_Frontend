import React from "react";
import Navbar from "./Component/Features/Navbar";
import Footer from "./Component/Features/Footer";

const Container = ({ children }) => {
  return (
    <div className="cant">
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
};

export default Container;
