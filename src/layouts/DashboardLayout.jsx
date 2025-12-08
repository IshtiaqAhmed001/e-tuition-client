import React from "react";
import { Outlet } from "react-router";
import {
  FaUser,
  FaUsers,
  FaChalkboardTeacher,
  FaHome,
  FaPlus,
  FaEdit,
  FaBookReader,
  FaMoneyBill,
  FaCog,
  FaList,
  FaUserShield,
} from "react-icons/fa";
import Logo from "../components/Logo/Logo";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const DashboardLayout = () => {
const axiosPublic = useAxiosPublic();
const { user } = useAuth();

const { data: currentUser = {} } = useQuery({
  queryKey: ["currentUser"],
  queryFn: async () => {
    const res = await axiosPublic.get(`users/${user.email}`);
    return res.data;
  },
});
  const navLinkStyle =
    "is-drawer-close:tooltip is-drawer-close:tooltip-right tooltip-accent hover:bg-accent hover:text-primary transition-colors";
  // const navLinkStyle =
  //   "is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-primary/10 hover:text-primary transition-colors";
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* NAVBAR */}
      <div className="drawer-content">
        <nav className="navbar w-full bg-primary text-neutral">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost hover:bg-secondary border-none shadow-none  text-neutral"
          >
            {/* icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>

          <div className="px-4 font-semibold text-neutral">
            <Logo />
          </div>
        </nav>

        <Outlet />
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <div className="flex min-h-full flex-col bg-neutral/10 is-drawer-close:w-14 is-drawer-open:w-64 border-r border-primary/20">
          <ul className="menu w-full grow text-primary font-medium">
            {/* HOME */}
            <li>
              <button className={navLinkStyle} data-tip="Dashboard Home">
                <FaHome className="size-4" />
                <span className="is-drawer-close:hidden">Dashboard Home</span>
              </button>
            </li>

            {/* PROFILE */}
            <li>
              <button
                className={navLinkStyle}
                // className={navLinkStyle}
                data-tip="My Profile"
              >
                <FaUser className="size-4" />
                <span className="is-drawer-close:hidden">My Profile</span>
              </button>
            </li>

            <li>
              <button className={navLinkStyle} data-tip="Edit Profile">
                <FaEdit className="size-4" />
                <span className="is-drawer-close:hidden">Edit Profile</span>
              </button>
            </li>
{
  currentUser.role==='student' && <>
        {/* STUDENT PANEL */}
            <li className="mt-4 font-bold text-secondary is-drawer-close:hidden">
              Student Panel
            </li>

            <li>
              <button className={navLinkStyle} data-tip="Post Tuition">
                <FaPlus className="size-4" />
                <span className="is-drawer-close:hidden">Post Tuition</span>
              </button>
            </li>

            <li>
              <button className={navLinkStyle} data-tip="My Tuitions">
                <FaList className="size-4" />
                <span className="is-drawer-close:hidden">My Tuitions</span>
              </button>
            </li>

            <li>
              <button className={navLinkStyle} data-tip="Tutors">
                <FaChalkboardTeacher className="size-4" />
                <span className="is-drawer-close:hidden">Tutors</span>
              </button>
            </li>
</>
}
            
       
            {/* TUTOR PANEL */}
            <li className="mt-4 font-bold text-secondary is-drawer-close:hidden">
              Tutor Panel
            </li>

            <li>
              <button className={navLinkStyle} data-tip="Available Tuitions">
                <FaBookReader className="size-4" />
                <span className="is-drawer-close:hidden">
                  Available Tuitions
                </span>
              </button>
            </li>

            <li>
              <button className={navLinkStyle} data-tip="My Accepted">
                <FaList className="size-4" />
                <span className="is-drawer-close:hidden">My Accepted</span>
              </button>
            </li>

            <li>
              <button className={navLinkStyle} data-tip="Earnings">
                <FaMoneyBill className="size-4" />
                <span className="is-drawer-close:hidden">Earnings</span>
              </button>
            </li>

            {/* ADMIN PANEL */}
            <li className="mt-4 font-bold text-secondary is-drawer-close:hidden">
              Admin Panel
            </li>

            <li>
              <button className={navLinkStyle} data-tip="Manage Users">
                <FaUsers className="size-4" />
                <span className="is-drawer-close:hidden">Manage Users</span>
              </button>
            </li>

            <li>
              <button className={navLinkStyle} data-tip="Manage Tutors">
                <FaChalkboardTeacher className="size-4" />
                <span className="is-drawer-close:hidden">Manage Tutors</span>
              </button>
            </li>

            <li>
              <button className={navLinkStyle} data-tip="Manage Tuitions">
                <FaBookReader className="size-4" />
                <span className="is-drawer-close:hidden">Manage Tuitions</span>
              </button>
            </li>

            <li>
              <button className={navLinkStyle} data-tip="Approvals">
                <FaUserShield className="size-4" />
                <span className="is-drawer-close:hidden">Approvals</span>
              </button>
            </li>

            {/* SETTINGS */}
            <li className="mt-4">
              <button className={navLinkStyle} data-tip="Settings">
                <FaCog className="size-4" />
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
