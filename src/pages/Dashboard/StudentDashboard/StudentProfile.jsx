import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const StudentProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { register, handleSubmit } = useForm();

  const { data: profile = {}, refetch } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`users/${user.email}/profile`);
      return res.data;
    },
  });

  const handleUpdateProfile = async (data) => {
    const updatedProfile = {
      photo: data.photo,
      phone: data.phone,
      location: data.location,
    };

    const res = await axiosSecure.patch(
      `/users/${user.email}/profile`,
      updatedProfile
    );

    if (res.data.modifiedCount) {
      refetch();
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto bg-base-200 rounded-xl shadow-md border border-base-300 p-6">
        <div className="flex items-center gap-6">
          <div className="avatar">
            <div className="w-28 rounded-full ring ring-primary ring-offset-base-200 ring-offset-2">
              <img src={profile.photo} alt="profile" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-primary">Student Profile</h2>
            <p className="text-secondary">
              Manage your student account details
            </p>
          </div>
        </div>

        <div className="divider my-6"></div>

        <form
          onSubmit={handleSubmit(handleUpdateProfile)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="space-y-4">
            <div>
              <label className="label text-primary font-medium">
                Full Name
              </label>
              <input
                type="text"
                defaultValue={profile.name}
                disabled
                className="input input-bordered w-full bg-base-300"
              />
            </div>

            <div>
              <label className="label text-primary font-medium">Email</label>
              <input
                type="email"
                defaultValue={profile.email}
                disabled
                className="input input-bordered w-full bg-base-300"
              />
            </div>

            <div>
              <label className="label text-primary font-medium">Role</label>
              <input
                type="text"
                defaultValue={profile.role}
                disabled
                className="input input-bordered w-full bg-base-300"
              />
            </div>

            <div>
              <label className="label text-primary font-medium">
                Photo URL
              </label>
              <input
                type="text"
                {...register("photo")}
                defaultValue={profile.photo}
                className="input input-bordered w-full bg-base-100"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="label text-primary font-medium">Phone</label>
              <input
                type="text"
                {...register("phone")}
                defaultValue={profile.phone}
                className="input input-bordered w-full bg-base-100"
              />
            </div>

            <div>
              <label className="label text-primary font-medium">Location</label>
              <input
                type="text"
                {...register("location")}
                defaultValue={profile.profile?.location}
                className="input input-bordered w-full bg-base-100"
              />
            </div>
          </div>

          <div className="md:col-span-2 text-end mt-6">
            <button type="submit" className="btn btn-primary px-10">
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentProfile;
