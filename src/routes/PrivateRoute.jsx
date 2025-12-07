import React from "react";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading/Loading";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }
  return children;
};

export default PrivateRoute;
