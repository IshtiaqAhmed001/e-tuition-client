import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
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

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      {
        path: "/tuitions",
        element: <PrivateRoute>
          <Tuitions/>
        </PrivateRoute>,
        hydrateFallbackElement: <Loading />,
        loader: () => fetch("/tuitionListings.json").then((res) => res.json()),
      },
      {
        path: "/tutors",
        element: <PrivateRoute>
          <Tutors/>
        </PrivateRoute>,
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
    Component: DashboardLayout,
  },
]);
