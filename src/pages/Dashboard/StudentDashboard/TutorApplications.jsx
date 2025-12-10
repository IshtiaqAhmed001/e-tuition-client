import React from "react";
import { FaEnvelope, FaUserTie } from "react-icons/fa6";

const TutorApplications = () => {
  const applications = [
    {
      tutorName: "Mahmud Hasan",
      tutorImage: "",
      subject: "Mathematics",
      experience: 3,
      appliedDate: "2025-12-02",
      status: "Pending",
    },
    {
      tutorName: "Sara Rahman",
      tutorImage: "",
      subject: "English",
      experience: 2,
      appliedDate: "2025-12-03",
      status: "Approved",
    },
    {
      tutorName: "Ahmed Chowdhury",
      tutorImage: "",
      subject: "Physics",
      experience: 4,
      appliedDate: "2025-12-01",
      status: "Pending",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-primary mb-6">
        Tutor Applications
      </h1>

      <div className="overflow-x-auto rounded-xl shadow bg-neutral border border-accent/30 mb-10">
        <table className="table">
          <thead className="bg-primary text-neutral">
            <tr>
              <th>#</th>
              <th>Tutor</th>
              <th>Experience</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app, idx) => (
              <tr key={idx} className="hover:bg-accent/20">
                <td className="font-medium">{idx + 1}</td>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={
                            app.tutorImage ||
                            "https://img.daisyui.com/images/profile/demo/2@94.webp"
                          }
                          alt={app.tutorName}
                        />
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold text-primary">
                        {app.tutorName}
                      </p>
                      <span className="text-xs flex items-center gap-1 text-gray-600">
                        <FaUserTie /> {app.subject}
                      </span>
                    </div>
                  </div>
                </td>

                <td>{app.experience} yrs</td>

                <td>{app.appliedDate}</td>

                <td
                  className={`font-medium ${
                    app.status === "Pending" ? "text-secondary" : "text-primary"
                  }`}
                >
                  {app.status}
                </td>

                <td className="flex gap-2 justify-end">
                  <button className="btn btn-xs bg-secondary text-neutral border-none hover:bg-primary">
                    <FaEnvelope /> Message
                  </button>

                  <button className="btn btn-xs bg-accent border-none hover:bg-secondary">
                    Approve
                  </button>

                  <button className="btn btn-xs btn-primary hover:bg-secondary border-none">
                    Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TutorApplications;
