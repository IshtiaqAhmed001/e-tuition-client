import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const OngoingTuitions = () => {
  const axiosSecure = useAxiosSecure();

  const { data: applications = [] } = useQuery({
    queryKey: ["tutor-ongoing-tuitions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      return res.data;
    },
  });

  // 🔗 handler only (you will implement backend logic later)
  const handleViewDetails = (applicationId) => {
    console.log("View details for:", applicationId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-primary mb-6">Ongoing Tuitions</h1>

      <div className="overflow-x-auto rounded-xl shadow bg-neutral border border-accent/30">
        <table className="table">
          <thead className="bg-primary text-neutral">
            <tr>
              <th>#</th>
              <th>Tuition Title</th>
              <th>Applied Date</th>
              <th>Application Status</th>
              <th>Payment Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app, idx) => {
              const status = app.status?.toLowerCase();

              const statusColor = {
                pending: "text-accent",
                paid: "text-primary",
                rejected: "text-error",
                unpaid: "text-error",
                accepted: "text-primary",
              };

              return (
                <tr key={app._id} className="hover:bg-accent/20">
                  <td className="font-medium">{idx + 1}</td>

                  <td className="font-semibold text-primary">
                    {app.tuitionTitle}
                  </td>

                  <td>{new Date(app.appliedDate).toLocaleString()}</td>

                  <td className={`font-medium ${app.status==='pending'?'text-green-600':app.status==='accepted'?'text-primary':'text-error'}`}>
                    {app.status}
                  </td>
                  <td className={`font-medium ${app.paymentStatus==='paid'?'text-primary':'text-error'}`}>
                    {app.paymentStatus}
                  </td>

                  <td className="text-right align-middle">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleViewDetails(app._id)}
                        className="btn btn-xs bg-accent border-none hover:bg-secondary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleViewDetails(app._id)}
                        className="btn btn-xs bg-error border-none hover:bg-secondary"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OngoingTuitions;
