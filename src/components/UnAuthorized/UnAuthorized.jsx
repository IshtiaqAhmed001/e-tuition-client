import React from "react";
import { Link, useNavigate } from "react-router";
import { FaLock } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const Unauthorized = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F5F3] px-4">
      <div className="text-center bg-white shadow-xl rounded-2xl p-10 max-w-md border border-[#007C63]/10">
        {/* Icon */}
        <div className="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-[#007C63]/10">
          <FaLock className="text-4xl text-[#007C63]" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-[#007C63] mb-2">
          Access Denied
        </h1>

        {/* Subtitle */}
        <p className="text-gray-700 mb-6">
          You don't have permission to view this page. Please contact the admin
          or try logging in again.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="btn bg-[#007C63] text-white hover:bg-[#019374] border-none"
          >
            Go to Home
          </Link>

          <button
            onClick={() => {
              logoutUser().then(navigate("/login"));
            }}
            className="btn bg-[#FFD166] text-black hover:bg-[#f4c453] border-none"
          >
            Login Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
