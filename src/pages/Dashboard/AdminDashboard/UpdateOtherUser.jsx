import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const UpdateOtherUser = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit } = useForm();

  const {
    data: user = {},
    isLoading,
    refetch
  } = useQuery({
    queryKey: ["admin-user", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/users/${id}`);
      return res.data;
    },
  });

  const handleUpdateProfile = async (data) => {
    const updatedProfile = {
      name: data.name,
      phone: data.phone,
      photo: data.photo,
      gender: data.gender,
      qualification: data.qualification,
      experience: data.experience,
      teachingSubject: data.teachingSubject
        ? data.teachingSubject.split(",").map((s) => s.trim())
        : [],
      expectedSalary: data.expectedSalary ? Number(data.expectedSalary) : null,
      location: data.location,
    };

    const res = await axiosSecure.patch(
      `/admin/users/${id}/profile`,
      updatedProfile
    );

    if (res.data.success) {
      refetch();
      Swal.fire("Updated", "User profile updated successfully", "success");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-base-200 rounded-xl">
      <h2 className="text-2xl font-semibold text-primary mb-1">
        {user.role === "student" ? "Student Profile" : "Tutor Profile"}
      </h2>
      <p className="text-sm text-warning mb-6">Admin access only</p>

      <form
        onSubmit={handleSubmit(handleUpdateProfile)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <label className="label">Name</label>
          <input
            {...register("name")}
            defaultValue={user.name}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Email</label>
          <input
            disabled
            defaultValue={user.email}
            className="input input-bordered w-full bg-base-300"
          />
        </div>

        <div>
          <label className="label">Role</label>
          <input
            disabled
            defaultValue={user.role}
            className="input input-bordered w-full bg-base-300"
          />
        </div>

        <div>
          <label className="label">Phone</label>
          <input
            {...register("phone")}
            defaultValue={user.phone}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Photo URL</label>
          <input
            {...register("photo")}
            defaultValue={user.photo}
            className="input input-bordered w-full"
          />
        </div>

        {user.role === "tutor" && (
          <>
            <div>
              <label className="label">Gender</label>
              <select
                {...register("gender")}
                defaultValue={user.profile?.gender}
                className="select select-bordered w-full"
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="label">Qualification</label>
              <input
                {...register("qualification")}
                defaultValue={user.profile?.qualification}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Experience</label>
              <input
                type="number"
                {...register("experience")}
                defaultValue={user.profile?.experience}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Teaching Subjects</label>
              <input
                {...register("teachingSubject")}
                defaultValue={user.profile?.teachingSubject?.join(", ")}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Expected Salary</label>
              <input
                type="number"
                {...register("expectedSalary")}
                defaultValue={user.profile?.expectedSalary}
                className="input input-bordered w-full"
              />
            </div>
          </>
        )}

        <div className="md:col-span-2">
          <label className="label">Location</label>
          <input
            {...register("location")}
            defaultValue={user.profile?.location}
            className="input input-bordered w-full"
          />
        </div>

        <div className="md:col-span-2 text-end mt-4">
          <button type="submit" className="btn btn-primary px-10">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateOtherUser;
