import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import Loading from "../../../components/Loading/Loading";

const OngoingTuitions = () => {
  const axiosSecure = useAxiosSecure();
  const editModalRef = useRef();
  const [selectedApplication, setSelectedApplication] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const { data: applications = [], refetch,isLoading } = useQuery({
    queryKey: ["tutor-ongoing-tuitions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      return res.data;
    },
  });

  const handleEditApplication = (application) => {
    if (application.status !== "pending") {
      Swal.fire({
        icon: "warning",
        title: "Edit not allowed",
        text: "You can only edit pending applications.",
        confirmButtonColor: "#007C63",
      });
      return;
    }

    setSelectedApplication(application);
    editModalRef.current.showModal();
  };
const handleUpdateApplication = async (data) => {
  try {
    await axiosSecure.patch(
      `/applications/${selectedApplication._id}/edit-application`,
      data
    );

    Swal.fire({
      icon: "success",
      title: "Application Updated",
      text: "Your application has been updated successfully.",
      confirmButtonColor: "#007C63",
    });

    editModalRef.current.close();
    reset();
    refetch();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Update failed",
      text: error.response?.data?.message || "Something went wrong",
    });
  }
};

const handleDeleteApplication = async (application) => {
  if (application.status !== "pending") {
    Swal.fire({
      icon: "warning",
      title: "Delete not allowed",
      text: "You cannot delete an approved or rejected application.",
      confirmButtonColor: "#007C63",
    });
    return;
  }

  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This application will be permanently deleted.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#007C63",
    confirmButtonText: "Yes, delete it!",
  });

  if (!result.isConfirmed) return;

  try {
    await axiosSecure.delete(`/applications/${application._id}/delete`);

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Application deleted successfully.",
      confirmButtonColor: "#007C63",
    });

    refetch();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Delete failed",
      text: error.response?.data?.message || "Something went wrong",
    });
  }
};

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">
        Ongoing Tuitions
      </h1>

      <div className="overflow-x-auto rounded-2xl shadow-lg bg-base-200 border border-base-300">
        <table className="table w-full">
          <thead className="bg-primary text-base-100">
            <tr>
              <th>#</th>
              <th>Tuition Title</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th>Payment</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app, idx) => (
              <tr
                key={app._id}
                className="hover:bg-accent/20 transition-colors duration-200"
              >
                <td className="font-medium">{idx + 1}</td>

                <td className="font-semibold text-primary">
                  {app.tuitionTitle}
                </td>

                <td>{new Date(app.appliedDate).toLocaleString()}</td>

                <td
                  className={`font-medium ${
                    app.status === "pending"
                      ? "text-yellow-400"
                      : app.status === "accepted"
                      ? "text-primary"
                      : "text-error"
                  }`}
                >
                  {app.status}
                </td>

                <td
                  className={`font-medium ${
                    app.paymentStatus === "paid" ? "text-primary" : "text-error"
                  }`}
                >
                  {app.paymentStatus}
                </td>

                <td>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleEditApplication(app)}
                      disabled={app.status !== "pending"}
                      className={`btn btn-xs border-none ${
                        app.status === "pending"
                          ? "bg-accent hover:bg-secondary transition-colors"
                          : "bg-gray-700 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteApplication(app)}
                      disabled={app.status !== "pending"}
                      className={`btn btn-xs border-none ${
                        app.status === "pending"
                          ? "bg-error hover:bg-red-600 transition-colors"
                          : "bg-gray-700 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Application Modal */}
      <dialog ref={editModalRef} className="modal">
        <div className="modal-box bg-base-200 border border-base-300 rounded-xl">
          <h3 className="font-bold text-2xl text-primary mb-6 text-center">
            Edit Application
          </h3>

          {selectedApplication && (
            <form
              onSubmit={handleSubmit(handleUpdateApplication)}
              className="space-y-4"
            >
              <input
                defaultValue={selectedApplication.qualification}
                {...register("qualification", { required: true })}
                placeholder="Qualification"
                className="input input-bordered w-full"
              />

              <input
                type="number"
                defaultValue={selectedApplication.experience}
                {...register("experience", { required: true })}
                placeholder="Experience (years)"
                className="input input-bordered w-full"
              />

              <input
                type="number"
                defaultValue={selectedApplication.expectedSalary}
                {...register("expectedSalary", { required: true })}
                placeholder="Expected Salary"
                className="input input-bordered w-full"
              />

              <div className="modal-action justify-end">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => editModalRef.current.close()}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default OngoingTuitions;
