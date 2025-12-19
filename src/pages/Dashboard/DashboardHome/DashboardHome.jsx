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
        "Welcome to your student dashboard. Manage your tuitions and applications from the sidebar.",
      icon: <FaUserGraduate className="text-6xl text-primary" />,
    },
    tutor: {
      title: "Tutor Dashboard",
      message:
        "Welcome to your tutor dashboard. Track your ongoing tuitions and earnings easily.",
      icon: <FaChalkboardTeacher className="text-6xl text-primary" />,
    },
    admin: {
      title: "Admin Dashboard",
      message:
        "Welcome to the admin dashboard. Manage users, tuitions, and platform activity.",
      icon: <FaUserShield className="text-6xl text-primary" />,
    },
  };

  const current = roleContent[role];

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-neutral border border-accent/40 rounded-3xl shadow-lg p-8 md:p-12 text-center">
        <div className="flex justify-center mb-6">{current.icon}</div>

        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          {current.title}
        </h1>

        <p className="mt-4 text-gray-600 text-base md:text-lg">
          {current.message}
        </p>
      </div>
    </div>
  );
};

export default DashboardHome;





// import React from "react";
// import useRole from "../../../hooks/useRole";
// import Loading from "../../../components/Loading/Loading";
// import StudentProfile from "../StudentDashboard/StudentProfile";
// import TutorProfile from "../TutorDashboard/TutorProfile";
// import AdminProfile from "../AdminDashboard/AdminProfile";

// const DashboardHome = () => {
//   const { role, roleLoading } = useRole();

//   if (roleLoading) {
//     return <Loading></Loading>;
//   }

//   if (role === "tutor") {
//     return <TutorProfile />;
//   } else if (role === "admin") {
//     return <AdminProfile />;
//   }
//   if (role === "student" || "") {
//     return <StudentProfile />;
//   }
// };

// export default DashboardHome;
