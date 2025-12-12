import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading/Loading";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();
  const location = useLocation();

  if (loading || roleLoading) return <Loading />;

  if (!user || role !== "admin") {
    return <Navigate to="/unauthorized" state={location.pathname} />;
  }

  return children;
};

export default AdminRoute;
