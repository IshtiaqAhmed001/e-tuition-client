import React from "react";
import { Link, Outlet } from "react-router";
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
import useRole from "../hooks/useRole";
import Loading from "../components/Loading/Loading";

const DashboardLayout = () => {
  const { role, roleLoading } = useRole();

  const navLinkStyle =
    "is-drawer-close:tooltip is-drawer-close:tooltip-right tooltip-accent hover:bg-accent hover:text-primary transition-colors";

  if (roleLoading) {
    return <Loading />;
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* NAVBAR */}
      <div className="drawer-content">
        <nav className="navbar w-full bg-primary text-neutral">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost hover:bg-secondary border-none shadow-none text-neutral"
          >
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
            <Link to="/">
              <Logo />
            </Link>
          </div>
        </nav>

        <Outlet />
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          className="drawer-overlay bg-black/40"
        ></label>

        <div
          className="
            flex min-h-full flex-col
            bg-neutral lg:bg-neutral/10
            is-drawer-close:w-14 is-drawer-open:w-64
            border-r border-primary/20
          "
        >
          <ul className="menu w-full grow text-primary font-medium bg-transparent">
            {/* HOME */}
            <li>
              <Link className={navLinkStyle} to="/" data-tip="Dashboard Home">
                <FaHome className="size-4" />
                <span className="is-drawer-close:hidden">Home</span>
              </Link>
            </li>

            {/* STUDENT PANEL */}
            {role === "student" && (
              <>
                <li>
                  <Link
                    to="/dashboard/student/profile"
                    className={navLinkStyle}
                    data-tip="My Profile"
                  >
                    <FaUser className="size-4" />
                    <span className="is-drawer-close:hidden">Profile</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/student/post-tuition"
                    className={navLinkStyle}
                    data-tip="Post Tuition"
                  >
                    <FaPlus className="size-4" />
                    <span className="is-drawer-close:hidden">Post Tuition</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/student/my-tuitions"
                    className={navLinkStyle}
                    data-tip="My Tuitions"
                  >
                    <FaList className="size-4" />
                    <span className="is-drawer-close:hidden">My Tuitions</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/student/tutor-applications"
                    className={navLinkStyle}
                    data-tip="Tutor Applications"
                  >
                    <FaChalkboardTeacher className="size-4" />
                    <span className="is-drawer-close:hidden">
                      Tutor Applications
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/student/payment-history"
                    className={navLinkStyle}
                    data-tip="Payment History"
                  >
                    <FaMoneyBill className="size-4" />
                    <span className="is-drawer-close:hidden">
                      Payment History
                    </span>
                  </Link>
                </li>
              </>
            )}

            {/* TUTOR PANEL */}
            {role === "tutor" && (
              <>
                <li>
                  <Link
                    to="/dashboard/tutor/profile"
                    className={navLinkStyle}
                    data-tip="My Profile"
                  >
                    <FaUser className="size-4" />
                    <span className="is-drawer-close:hidden">Profile</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/tutor/ongoing-tuitions"
                    className={navLinkStyle}
                    data-tip="Ongoing Tuitions"
                  >
                    <FaBookReader className="size-4" />
                    <span className="is-drawer-close:hidden">
                      My Ongoing Tuitions
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/tutor/revenue-history"
                    className={navLinkStyle}
                    data-tip="Revenue History"
                  >
                    <FaMoneyBill className="size-4" />
                    <span className="is-drawer-close:hidden">
                      Revenue History
                    </span>
                  </Link>
                </li>
              </>
            )}

            {/* ADMIN PANEL */}
            {role === "admin" && (
              <>
                <li>
                  <Link
                    to="/dashboard/admin/manage-users"
                    className={navLinkStyle}
                    data-tip="Manage Users"
                  >
                    <FaUsers className="size-4" />
                    <span className="is-drawer-close:hidden">Manage Users</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/admin/manage-tuitions"
                    className={navLinkStyle}
                    data-tip="Manage Tuitions"
                  >
                    <FaBookReader className="size-4" />
                    <span className="is-drawer-close:hidden">
                      Manage Tuitions
                    </span>
                  </Link>
                </li>

                <li>
                  <Link to="/dashboard/admin/all-payments">
                    <button className={navLinkStyle} data-tip="All Payments">
                      <FaMoneyBill className="size-4" />
                      <span className="is-drawer-close:hidden">
                        All Payments
                      </span>
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
