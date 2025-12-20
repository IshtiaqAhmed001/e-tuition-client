import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUserEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";
import Loading from "../../../components/Loading/Loading";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch: refetchUsers,isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const result = await axiosSecure.get("/users");
      return result.data;
    },
  });

  const handleRoleChange = async (userId, newRole) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Change user role to "${newRole}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, change role",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/admin/users/${userId}/role`, {
        role: newRole,
      });

      if (res.data.modifiedCount) {
        Swal.fire({
          icon: "success",
          title: "Role Updated",
          text: `User role changed to ${newRole}`,
          timer: 1500,
          showConfirmButton: false,
        });
        refetchUsers();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to update role",
      });
    }
  };

  const handleDeleteUser = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete user",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/admin/users/${userId}`);

      if (res.data.deletedCount) {
        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: "User has been deleted successfully",
          timer: 1500,
          showConfirmButton: false,
        });
        refetchUsers();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to delete user",
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-primary mb-6">Manage Users</h1>

      <div className="overflow-x-auto rounded-xl shadow bg-neutral border border-accent/30 mb-10">
        <table className="table">
          <thead className="bg-primary text-neutral">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              {/* <th>Status</th> */}
              <th>Joined</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, idx) => (
              <tr key={idx} className="hover:bg-accent/20">
                <td className="font-medium">{idx + 1}</td>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={
                            user.photo ||
                            "https://img.daisyui.com/images/profile/demo/1@94.webp"
                          }
                          alt={user.name}
                        />
                      </div>
                    </div>
                    <p className="font-semibold text-primary">{user.name}</p>
                  </div>
                </td>

                <td className="text-secondary">{user.email}</td>

                {/* ROLE DROPDOWN (FINAL SIMPLE VERSION) */}
                <td>
                  <select
                    className="select select-bordered select-xs bg-base-100 text-primary"
                    defaultValue={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                {/* Approval Status */}
                {/* <td>
                  <select
                    disabled={user.role === "admin"}
                    className={`
      select select-bordered select-xs bg-base-100
      ${
        user?.profile?.approvalStatus === "approved"
          ? "border-primary text-primary"
          : "border-accent text-accent"
      }
    `}
                    defaultValue={user?.profile?.approvalStatus || "pending"}
                    onChange={(e) =>
                      handleStatusChange(user._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                  </select>
                </td> */}

                <td>{user?.profile?.joinDate}</td>

                <td className="flex gap-2 justify-end">
                  <Link
                    to={`/dashboard/admin/users/${user._id}`}
                    className="btn btn-xs bg-secondary text-neutral border-none hover:bg-primary"
                  >
                    <FaEye /> Profile Actions
                  </Link>

                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="btn btn-xs bg-red-600 text-neutral hover:bg-red-500 border-none"
                  >
                    <FaTrashAlt /> Delete
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

export default ManageUsers;
