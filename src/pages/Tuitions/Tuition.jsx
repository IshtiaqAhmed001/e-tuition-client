import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";

const Tuition = ({ tuition }) => {
  return (
    <div className="rounded-xl bg-neutral p-6 shadow-md border border-accent/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
      {/* Accent bar top */}
      <div className="absolute top-0 left-0 h-1 w-full bg-accent"></div>

      {/* Title */}
      <h2 className="text-xl font-bold text-primary mb-2 border-b border-accent/30 pb-2">
        {tuition.title}
      </h2>

      {/* Subject + class */}
      <p className="flex gap-2 mt-3 text-sm text-primary font-medium items-center">
        <FaBook />
        {tuition.subject} — {tuition.class}
      </p>

      {/* Location */}
      <p className="flex gap-2 items-center mt-2 text-sm text-gray-600">
        <FaLocationDot />
        {tuition.location}
      </p>

      <p className="mt-2 text-sm">
        <span className="font-semibold text-secondary">Days/Week:</span>{" "}
        {tuition.daysPerWeek}
      </p>

      <p className="mt-1 text-sm">
        <span className="font-semibold text-secondary">Schedule:</span>{" "}
        {tuition.schedule}
      </p>

      {/* Salary */}
      <p className="text-xl font-bold text-primary mt-4">৳ {tuition.salary}</p>

      <div className="flex justify-between items-center mt-6">
        {/* Status badge */}
        <span
          className={`badge border-0 px-4 py-2 rounded-full shadow-sm ${
            tuition.status === "Approved"
              ? "bg-secondary text-white"
              : "bg-accent text-black"
          }`}
        >
          {tuition.status}
        </span>

        <button className="btn btn-sm bg-primary border-none hover:bg-secondary text-neutral">
          Details
        </button>
      </div>
    </div>
  );
};

export default Tuition;
