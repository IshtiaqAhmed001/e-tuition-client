import React from "react";
import useRole from "../../../hooks/useRole";
import Loading from "../../../components/Loading/Loading";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserShield,
} from "react-icons/fa";

const DashboardHome = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) return <Loading />;

  const roleContent = {
    student: {
      title: "Student Dashboard",
      message:
        "Manage your tuitions, track applications, and find the perfect tutors—all from one place.",
      icon: <FaUserGraduate className="text-6xl text-primary mb-4" />,
    },
    tutor: {
      title: "Tutor Dashboard",
      message:
        "View ongoing tuitions, track earnings, and connect with students easily.",
      icon: <FaChalkboardTeacher className="text-6xl text-primary mb-4" />,
    },
    admin: {
      title: "Admin Dashboard",
      message:
        "Manage users, tuitions, and platform activity efficiently from here.",
      icon: <FaUserShield className="text-6xl text-primary mb-4" />,
    },
  };

  const current = roleContent[role];

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-neutral/80 dark:bg-neutral border border-accent/40 rounded-3xl shadow-lg p-8 md:p-12 text-center transition-colors">
        <div className="flex justify-center">{current.icon}</div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">
          {current.title}
        </h1>

        <p className="mt-2 text-base-content/70 text-base md:text-lg leading-relaxed">
          {current.message}
        </p>
      </div>
    </div>
  );
};

export default DashboardHome;
