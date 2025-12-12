import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading/Loading";

const TutorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();
  const location = useLocation();

  if (loading || roleLoading) return <Loading />;

  if (!user || role !== "tutor") {
    return <Navigate to="/unauthorized" state={location.pathname} />;
  }

  return children;
};

export default TutorRoute;
