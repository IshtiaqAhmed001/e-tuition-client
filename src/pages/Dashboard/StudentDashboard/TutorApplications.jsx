import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaEnvelope, FaUserTie } from "react-icons/fa6";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const TutorApplications = () => {

  const axiosSecure = useAxiosSecure();
const {user}=useAuth();

  const { data: applications = [], refetch } = useQuery({
    queryKey: ["my-applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      return res.data;
    },
  });

  const handleUpdateStatus = async (applicationId, status) => {
    const res = await axiosSecure.patch(
      `/applications/${applicationId}/update-status`,
      {
        status,
      }
    );

    if (res.data.modifiedCount) {
      refetch();
      alert(`Application status updated to ${status}`);
    }
  };

  const handlePayment= async(application)=>{
 const paymentInfo = {
   applicationId: application?._id,
   tuitionId: application?.tuitionId,
   tuitionTitle: application?.tuitionTitle,
   studentId: application?.studentId,
   tutorId: application?.tutorId,
   cost: application?.expectedSalary,
   email: user?.email,
 };
const res = await axiosSecure.post("/payment-checkout-session", paymentInfo);
window.location.assign(res.data.url);
  }

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
              <th>Applied For</th>
              <th>Applied Date</th>
              <th>Application Status</th>
              <th>Payment Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app, idx) => (
              <tr key={idx} className="hover:bg-accent/20 ">
                <td className="font-medium">{idx + 1}</td>

                <td>
                      <p className="font-semibold text-primary">
                        {app.tutorName}
                      </p>
                </td>

                <td>{app.experience} yrs</td>
                <td>{app.tuitionTitle}</td>

                <td>{new Date(app.appliedDate).toLocaleString()}</td>

                <td className="text-center">
                  <button
                    className={`font-medium ${
                      app.status === "pending"
                        ? "text-accent"
                        : app?.status === "accepted"
                        ? "text-primary"
                        : "text-error"
                    }`}
                  >
                    {app.status.toUpperCase()}
                  </button>
                </td>
                <td className="text-center ">
                  <button
                    className={`font-medium cursor-not-allowed ${
                      app.paymentStatus === "unpaid" ||
                      app.paymentStatus === "pending"
                        ? "btn btn-xs btn-accent"
                        : app?.paymentStatus === "paid"
                        ? "btn btn-xs btn-primary"
                        : "btn btn-xs btn-error"
                    }`}
                  >
                    {app.paymentStatus.toUpperCase()}
                  </button>
                </td>

                <td className="text-right align-middle">
                  <div className="flex gap-2 justify-end items-center">
                    <button
                      disabled={app.paymentStatus === "paid"}
                      onClick={() => handlePayment(app)}
                      className={`btn btn-xs border-none ${
                        app.paymentStatus === "paid"
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-accent hover:bg-secondary"
                      }`}
                    >
                      Pay
                    </button>

                    <button
                      disabled={app.paymentStatus === "rejected"}
                      onClick={() => handleUpdateStatus(app._id, "rejected")}
                      className={`btn btn-xs border-none ${
                        app.paymentStatus === "rejected"
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "btn-error hover:bg-secondary"
                      }`}
                    >
                      Reject
                    </button>
                  </div>
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
