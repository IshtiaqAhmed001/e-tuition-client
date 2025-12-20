import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import Swal from "sweetalert2";

const ManageTuitions = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tuitions = [],isLoading, refetch } = useQuery({
    queryKey: ["tuitions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/tuitions");
      return res.data;
    },
  });

 

  // Approve or Reject handler
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/admin/tuitions/${id}/status`, {
        status: newStatus,
      });

      if (res.data.modifiedCount) {
      Swal.fire({
        icon: "success",
        title: `Tuition ${newStatus}`,
        text: `The tuition has been successfully marked as ${newStatus}.`,
        confirmButtonColor: "#007C63",
      });
        refetch();
      }
    } catch (error) {
      console.error(error);
     Swal.fire({
       icon: "error",
       title: "Update Failed",
       text: "Failed to update tuition status.",
       confirmButtonColor: "#FFD166",
     });
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-primary mb-6">Manage Tuitions</h1>

      <div className="overflow-x-auto rounded-xl shadow bg-neutral border border-accent/30 mb-10">
        <table className="table">
          <thead className="bg-primary text-neutral">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Posted By</th>
              <th>Posted Date</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tuitions.map((tuition, idx) => (
              <tr key={tuition._id} className="hover:bg-accent/20">
                <td className="font-medium">{idx + 1}</td>

                <td className="font-semibold text-primary">{tuition.title}</td>

                <td className="text-secondary">{tuition.postedBy}</td>

                <td>{tuition.postedDate}</td>

                <td>
                  <span
                    className={`badge ${
                      tuition.status === "Approved"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {tuition.status}
                  </span>
                </td>

                <td className="flex gap-2 justify-end">
                  {/* Approve */}
                  <button
                    disabled={tuition.status === "Approved"}
                    onClick={() => handleStatusChange(tuition._id, "Approved")}
                    className={`btn btn-xs border-none text-neutral 
                      ${
                        tuition.status === "Approved"
                          ? "bg-primary/40 cursor-not-allowed"
                          : "bg-primary hover:bg-secondary"
                      }`}
                  >
                    Approve
                  </button>

                  {/* Reject */}
                  <button
                    disabled={tuition.status === "Rejected"}
                    onClick={() => handleStatusChange(tuition._id, "Rejected")}
                    className={`btn btn-xs border-none text-neutral 
                      ${
                        tuition.status === "Rejected"
                          ? "bg-red-500/40 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-500"
                      }`}
                  >
                    Reject
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

export default ManageTuitions;
