import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const MyTuitions = () => {
  const axiosSecure = useAxiosSecure();
  const { user,loading } = useAuth();

  const editModalRef = useRef();
  const [selectedTuition, setSelectedTuition] = useState(null);

  const { register, handleSubmit, reset: formReset } = useForm();

  const { data: myTuitions = [], refetch } = useQuery({
    queryKey: ["myTuitions", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get("/my-tuitions");
      return res.data;
    },
  });

  const handleEditTuition = (tuition) => {
    if (tuition.status === "Approved" || tuition.status === "approved") {
      Swal.fire({
        icon: "warning",
        title: "Edit not allowed",
        text: "Approved tuitions cannot be edited.",
        confirmButtonColor: "#007C63",
      });
      return;
    }

    setSelectedTuition(tuition);
    editModalRef.current.showModal();
  };

  const handleUpdateTuition = async (data) => {
    try {
      await axiosSecure.patch(`/tuitions/${selectedTuition._id}/edit`, data);
      Swal.fire({
        icon: "success",
        title: "Tuition Updated",
        text: "Your tuition has been updated successfully.",
        confirmButtonColor: "#007C63",
      });

      editModalRef.current.close();
      formReset();
      refetch();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  const handleDeleteTuition = async (tuition) => {
    if (tuition.status === "Approved" || tuition.status === "approved") {
      Swal.fire({
        icon: "warning",
        title: "Delete not allowed",
        text: "Approved tuitions cannot be deleted.",
        confirmButtonColor: "#007C63",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This tuition will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#007C63",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/tuitions/${tuition._id}/delete`);

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Tuition deleted successfully.",
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-primary mb-6">
        My Posted Tuitions : {myTuitions.length}
      </h1>

      <div className="overflow-x-auto rounded-xl shadow bg-base-100 border border-base-300">
        <table className="table">
          <thead className="bg-primary text-base-100">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Subject</th>
              <th>Class</th>
              <th>Salary</th>
              <th>Days / Week</th>
              <th>Status</th>
              <th>Posted</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {myTuitions.map((tuition, idx) => (
              <tr key={tuition._id} className="hover:bg-base-200">
                <td>{idx + 1}</td>
                <td className="font-semibold text-primary">{tuition.title}</td>
                <td>{tuition.subject}</td>
                <td>{tuition.class}</td>
                <td className="text-accent font-medium">৳{tuition.salary}</td>
                <td>{tuition.daysPerWeek}</td>

                <td>
                  <span
                    className={`badge ${
                      tuition.status === "Approved"
                        ? "badge-primary"
                        : "badge-secondary"
                    }`}
                  >
                    {tuition.status}
                  </span>
                </td>

                <td>{tuition.postedDate}</td>

                <td className="flex gap-1">
                  <Link
                    to={`/tuitions/${tuition._id}/details`}
                    className="btn btn-xs btn-primary"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => handleEditTuition(tuition)}
                    disabled={tuition.status === "Approved"}
                    className={`btn btn-xs ${
                      tuition.status === "Approved"
                        ? "bg-gray-300 cursor-not-allowed"
                        : "btn-accent"
                    }`}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteTuition(tuition)}
                    disabled={tuition.status === "Approved"}
                    className={`btn btn-xs ${
                      tuition.status === "Approved"
                        ? "bg-gray-300 cursor-not-allowed"
                        : "btn-error"
                    }`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog ref={editModalRef} className="modal">
        <div className="modal-box bg-base-100 border border-base-300">
          <h3 className="font-bold text-2xl mb-6 text-primary">Edit Tuition</h3>

          {selectedTuition && (
            <form
              onSubmit={handleSubmit(handleUpdateTuition)}
              className="space-y-4"
            >
              <div>
                <label className="label">Title</label>
                <input
                  defaultValue={selectedTuition.title}
                  {...register("title", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">Salary</label>
                <input
                  type="number"
                  defaultValue={selectedTuition.salary}
                  {...register("salary", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">Days per week</label>
                <input
                  type="number"
                  defaultValue={selectedTuition.daysPerWeek}
                  {...register("daysPerWeek", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="modal-action">
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

export default MyTuitions;
