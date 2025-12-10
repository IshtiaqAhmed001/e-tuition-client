import React from "react";
import { useParams } from "react-router";
import { FaLocationDot, FaUser, FaClock } from "react-icons/fa6";

const TuitionDetails = () => {
  const { id } = useParams();

  // temporary dummy object until backend connected
  const tuition = {
    _id: id,
    title: "Need ICT Tutor",
    subject: "ICT",
    class: "10",
    location: "Bashundhara, Dhaka",
    salary: "5000",
    daysPerWeek: "4",
    schedule: "Evening",
    status: "Pending",
    postedBy: "john.cena@gmail.com",
    postedDate: "2025-12-09",
  };

  const handleApply = () => {
    console.log("Tutor applied!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      {/* Title */}
      <h1 className="text-3xl font-bold text-primary mb-6">Tuition Details</h1>

      <div className="rounded-xl bg-neutral shadow border border-accent/30 p-8">
        <h2 className="text-2xl font-semibold text-primary mb-6">
          {tuition.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* left */}
          <div className="space-y-4">
            <p>
              <span className="font-semibold text-secondary">Subject:</span>{" "}
              {tuition.subject}
            </p>

            <p>
              <span className="font-semibold text-secondary">Class:</span>{" "}
              {tuition.class}
            </p>

            <p className="flex items-center gap-2">
              <FaLocationDot className="text-primary" />
              <span className="font-semibold text-secondary">
                Location:
              </span>{" "}
              {tuition.location}
            </p>

            <p>
              <span className="font-semibold text-secondary">Salary:</span>{" "}
              {tuition.salary} BDT
            </p>
          </div>

          {/* right */}
          <div className="space-y-4">
            <p>
              <span className="font-semibold text-secondary">Days/Week:</span>{" "}
              {tuition.daysPerWeek}
            </p>

            <p className="flex items-center gap-2">
              <FaClock className="text-primary" />
              <span className="font-semibold text-secondary">
                Schedule:
              </span>{" "}
              {tuition.schedule}
            </p>

            <p>
              <span className="font-semibold text-secondary">Status:</span>{" "}
              <span className="capitalize text-primary font-bold">
                {tuition.status}
              </span>
            </p>

            <p className="flex items-center gap-2">
              <FaUser className="text-primary" />
              <span className="font-semibold text-secondary">
                Posted By:
              </span>{" "}
              {tuition.postedBy}
            </p>

            <p>
              <span className="font-semibold text-secondary">Posted Date:</span>{" "}
              {new Date(tuition.postedDate).toLocaleString()}
            </p>
          </div>
        </div>

        {/* button */}
        <div className="mt-10 text-center">
          <button
            onClick={handleApply}
            className="btn btn-primary px-10 text-neutral hover:bg-secondary"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TuitionDetails;
