import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaEnvelope, FaUserTie } from "react-icons/fa6";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";

const TutorApplications = () => {

  const axiosSecure = useAxiosSecure();
const {user}=useAuth();

  const { data: applications = [], refetch,isLoading } = useQuery({
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

    if (isLoading) {
      return <Loading />;
    }

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">
        Tutor Applications
      </h1>

      <div className="overflow-x-auto rounded-2xl shadow-lg bg-neutral border border-accent/30 mb-10">
        <table className="table w-full">
          <thead className="bg-primary text-neutral">
            <tr>
              <th>#</th>
              <th>Tutor</th>
              <th>Experience</th>
              <th>Applied For</th>
              <th>Applied Date</th>
              <th className="text-center">Application Status</th>
              <th className="text-center">Payment Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app, idx) => (
              <tr
                key={app._id || idx}
                className="hover:bg-base-200 transition-colors duration-200"
              >
                <td className="font-medium">{idx + 1}</td>

                <td>
                  <p className="font-semibold text-primary">{app.tutorName}</p>
                </td>

                <td>{app.experience} yrs</td>
                <td>{app.tuitionTitle}</td>
                <td>{new Date(app.appliedDate).toLocaleString()}</td>

                {/* Application Status */}
                <td className="text-center">
                  <span
                    className={`font-medium px-2 py-1 rounded-full ${
                      app.status === "pending"
                        ? "bg-amber-100 text-amber-600"
                        : app.status === "accepted"
                        ? "bg-primary/20 text-primary"
                        : "bg-red-100 text-error"
                    }`}
                  >
                    {app.status.toUpperCase()}
                  </span>
                </td>

                {/* Payment Status */}
                <td className="text-center">
                  <span
                    className={`font-medium px-2 py-1 rounded-full ${
                      app.paymentStatus === "unpaid" ||
                      app.paymentStatus === "pending"
                        ? "bg-accent/20 text-accent"
                        : app.paymentStatus === "paid"
                        ? "bg-primary/20 text-primary"
                        : "bg-red-100 text-error"
                    }`}
                  >
                    {app.paymentStatus.toUpperCase()}
                  </span>
                </td>

                {/* Actions */}
                <td className="text-right">
                  <div className="flex gap-2 justify-end items-center flex-wrap">
                    <button
                      disabled={app.paymentStatus === "paid"}
                      onClick={() => handlePayment(app)}
                      className={`btn btn-xs border-none ${
                        app.paymentStatus === "paid"
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-accent hover:bg-secondary text-neutral"
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
                          : "btn-error hover:bg-secondary text-neutral"
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
