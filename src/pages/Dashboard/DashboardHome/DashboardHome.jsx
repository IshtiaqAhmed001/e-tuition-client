import React from "react";
import useRole from "../../../hooks/useRole";
import Loading from "../../../components/Loading/Loading";
import StudentProfile from "../StudentDashboard/StudentProfile";
import TutorProfile from "../TutorDashboard/TutorProfile";
import AdminProfile from "../AdminDashboard/AdminProfile";

const DashboardHome = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Loading></Loading>;
  }

  if (role === "tutor") {
    return <TutorProfile />;
  } else if (role === "admin") {
    return <AdminProfile />;
  }
  if (role === "student" || "") {
    return <StudentProfile />;
  }
};

export default DashboardHome;
