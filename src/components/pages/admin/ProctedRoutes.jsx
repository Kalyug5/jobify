import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProctedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const { getUserData } = useSelector((state) => state.user);

  if (getUserData && getUserData?.role === "recruiter") {
    return <>{children}</>;
  }
  return navigate("/");
};

export default ProctedRoutes;
