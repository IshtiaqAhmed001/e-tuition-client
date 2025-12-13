import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Tuitions from "../pages/Tuitions/Tuitions";
import Tutors from "../pages/Tutors/Tutors";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Loading from "../components/Loading/Loading";
import Home from "../pages/Home/Home/Home";
import PostTuition from "../pages/Dashboard/StudentDashboard/PostTuition";
import MyTuitions from "../pages/Dashboard/StudentDashboard/MyTuitions";
import TutorApplications from "../pages/Dashboard/StudentDashboard/TutorApplications";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import TuitionDetails from "../pages/Tuitions/TuitionDetails";
import ManageUsers from "../pages/Dashboard/AdminDashboard/ManageUsers";
import ManageTuitions from "../pages/Dashboard/AdminDashboard/ManageTuitions";
import Unauthorized from "../components/UnAuthorized/UnAuthorized";
import StudentRoute from "./StudentRoute";
import AdminRoute from "./AdminRoute";
import TutorRoute from "./TutorRoute";
import OngoingTuitions from "../pages/Dashboard/TutorDashboard/OngoingTuitions";
import RevenueHistory from "../pages/Dashboard/TutorDashboard/RevenueHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      {
        path: "/tuitions",
        Component: Tuitions,
      },
      {
        path: "/tuitions/:id/details",
        element: (
          <PrivateRoute>
            <TuitionDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/tutors",
        element: (
          <PrivateRoute>
            <Tutors />
          </PrivateRoute>
        ),
        hydrateFallbackElement: <Loading />,
        loader: () => fetch("/tutorsData.json").then((res) => res.json()),
      },
      { path: "/about", Component: About },
      { path: "/contact", Component: Contact },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "student/post-tuition",
        element: (
          <StudentRoute>
            <PostTuition />
          </StudentRoute>
        ),
      },
      {
        path: "student/my-tuitions",
        element: (
          <StudentRoute>
            <MyTuitions />
          </StudentRoute>
        ),
      },
      {
        path: "student/tutor-applications",
        element: (
          <StudentRoute>
            <TutorApplications />
          </StudentRoute>
        ),
      },
      {
        path: "tutor/ongoing-tuitions",
        element: (
          <TutorRoute>
            <OngoingTuitions />
          </TutorRoute>
        ),
      },
      {
        path: "tutor/revenue-history",
        element: (
          <TutorRoute>
            <RevenueHistory />
          </TutorRoute>
        ),
      },
      {
        path: "admin/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-tuitions",
        element: (
          <AdminRoute>
            <ManageTuitions />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "/unauthorized",
    Component: Unauthorized,
  },
]);
