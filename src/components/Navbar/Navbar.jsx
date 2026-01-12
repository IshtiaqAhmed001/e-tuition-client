import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import Logo from "../Logo/Logo";
import Swal from "sweetalert2";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Navbar = () => {
  const { user, logoutUser } = useAuth();

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-accent" : "")}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/tuitions"
          className={({ isActive }) => (isActive ? "text-accent" : "")}
        >
          Tuitions
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/tutors"
          className={({ isActive }) => (isActive ? "text-accent" : "")}
        >
          Tutors
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "text-accent" : "")}
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "text-accent" : "")}
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged Out!",
          timer: 1000,
          showConfirmButton: false,
        });
      })
      .catch(console.log);
  };

  return (
    <div className="sticky top-0 z-50 bg-primary text-neutral">
      <div className="navbar max-w-7xl mx-auto">
        {/* LEFT */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow-lg bg-primary text-neutral rounded-box w-52"
            >
              {navLinks}
              {!user && (
                <>
                  <li>
                    <NavLink to="/login" className="hover:text-accent">
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/register" className="hover:text-accent">
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Logo />
          </Link>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2">{navLinks}</ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end gap-2">
          <ThemeToggle />
          {!user ? (
            <>
              <Link
                to="/login"
                className="btn btn-sm bg-secondary border-0 text-neutral shadow-none"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-sm bg-accent shadow-none border-0"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-9 rounded-full">
                  <img
                    src={user.photoURL || "https://i.ibb.co/2kRZq0y/user.png"}
                    alt="profile"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content absolute mt-2 p-2 shadow-lg bg-primary text-neutral rounded-md w-52 z-50"
              >
                <li className="font-semibold px-2 py-1 border-b border-accent/30">
                  {user.displayName}
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-accent">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:text-accent w-full text-left"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
