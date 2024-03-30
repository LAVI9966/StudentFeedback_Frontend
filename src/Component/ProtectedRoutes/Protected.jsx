import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Protected = ({ Component }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decoded = jwtDecode(token);
      console.log(decoded);
      const validRoles = ["teacher", "student", "admin"];
      if (validRoles.includes(decoded.role)) {
        setIsAuthenticated(true);
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return isAuthenticated ? <Component /> : null;
};

export default Protected;
