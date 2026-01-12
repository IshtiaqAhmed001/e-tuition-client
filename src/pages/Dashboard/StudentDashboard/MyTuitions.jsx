import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import Loading from "../../../components/Loading/Loading";

const MyTuitions = () => {
  const axiosSecure = useAxiosSecure();
  const { user,loading } = useAuth();

  const editModalRef = useRef();
  const [selectedTuition, setSelectedTuition] = useState(null);

  const { register, handleSubmit, reset: formReset } = useForm();

  const { data: myTuitions = [], refetch ,isLoading} = useQuery({
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
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">
        My Posted Tuitions : {myTuitions.length}
      </h1>

      <div className="overflow-x-auto rounded-2xl shadow-lg bg-neutral border border-accent/30">
        <table className="table w-full">
          <thead className="bg-primary text-neutral">
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
              <tr
                key={tuition._id}
                className="hover:bg-base-200 transition-colors duration-200"
              >
                <td>{idx + 1}</td>
                <td className="font-semibold text-primary">{tuition.title}</td>
                <td>{tuition.subject}</td>
                <td>{tuition.class}</td>
                <td className="text-amber-600 font-medium">
                  ৳{tuition.salary}
                </td>
                <td>{tuition.daysPerWeek}</td>

                <td>
                  <span
                    className={`badge ${
                      tuition.status.toLowerCase() === "approved"
                        ? "badge-primary"
                        : "badge-secondary"
                    }`}
                  >
                    {tuition.status}
                  </span>
                </td>

                <td>{tuition.postedDate}</td>

                <td className="flex gap-2 flex-wrap justify-end">
                  <Link
                    to={`/tuitions/${tuition._id}/details`}
                    className="btn btn-xs btn-primary hover:shadow-md transition-all"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => handleEditTuition(tuition)}
                    disabled={tuition.status.toLowerCase() === "approved"}
                    className={`btn btn-xs ${
                      tuition.status.toLowerCase() === "approved"
                        ? "bg-gray-400 cursor-not-allowed text-gray-700"
                        : "btn-accent hover:shadow-md transition-all"
                    }`}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteTuition(tuition)}
                    disabled={tuition.status.toLowerCase() === "approved"}
                    className={`btn btn-xs ${
                      tuition.status.toLowerCase() === "approved"
                        ? "bg-gray-400 cursor-not-allowed text-gray-700"
                        : "btn-error hover:shadow-md transition-all"
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

      {/* EDIT MODAL */}
      <dialog ref={editModalRef} className="modal">
        <div className="modal-box bg-neutral border border-accent/30 rounded-2xl shadow-lg p-6 md:p-8">
          <h3 className="font-bold text-2xl mb-6 text-primary">Edit Tuition</h3>

          {selectedTuition && (
            <form
              onSubmit={handleSubmit(handleUpdateTuition)}
              className="space-y-4"
            >
              <div>
                <label className="label text-primary font-medium">Title</label>
                <input
                  defaultValue={selectedTuition.title}
                  {...register("title", { required: true })}
                  className="input input-bordered w-full bg-base-100 text-base-content"
                />
              </div>

              <div>
                <label className="label text-primary font-medium">Salary</label>
                <input
                  type="number"
                  defaultValue={selectedTuition.salary}
                  {...register("salary", { required: true })}
                  className="input input-bordered w-full bg-base-100 text-base-content"
                />
              </div>

              <div>
                <label className="label text-primary font-medium">
                  Days per week
                </label>
                <input
                  type="number"
                  defaultValue={selectedTuition.daysPerWeek}
                  {...register("daysPerWeek", { required: true })}
                  className="input input-bordered w-full bg-base-100 text-base-content"
                />
              </div>

              <div className="modal-action flex justify-end gap-2 mt-4">
                <button
                  type="submit"
                  className="btn btn-primary hover:shadow-md transition-all"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => editModalRef.current.close()}
                  className="btn btn-secondary hover:shadow-md transition-all"
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
