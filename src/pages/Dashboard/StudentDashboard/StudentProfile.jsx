import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading/Loading";

const StudentProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { register, handleSubmit } = useForm();

  const { data: profile = {}, refetch,isLoading } = useQuery({
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
    if (isLoading) {
      return <Loading />;
    }

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto bg-neutral border border-accent/20 rounded-3xl shadow-lg p-8 md:p-12">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="avatar">
            <div className="w-28 rounded-full ring ring-primary ring-offset-neutral ring-offset-2">
              <img
                src={
                  profile.photo ||
                  "https://img.daisyui.com/images/profile/demo/2@94.webp"
                }
                alt="profile"
                className="object-cover"
              />
            </div>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary">
              Student Profile
            </h2>
            <p className="text-base-content/70 mt-1">
              Manage your student account details
            </p>
          </div>
        </div>

        <div className="divider my-8"></div>

        {/* FORM */}
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
                className="input input-bordered w-full bg-base-300 text-base-content/90"
              />
            </div>

            <div>
              <label className="label text-primary font-medium">Email</label>
              <input
                type="email"
                defaultValue={profile.email}
                disabled
                className="input input-bordered w-full bg-base-300 text-base-content/90"
              />
            </div>

            <div>
              <label className="label text-primary font-medium">Role</label>
              <input
                type="text"
                defaultValue={profile.role}
                disabled
                className="input input-bordered w-full bg-base-300 text-base-content/90"
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
                className="input input-bordered w-full bg-base-100 text-base-content"
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
                className="input input-bordered w-full bg-base-100 text-base-content"
              />
            </div>

            <div>
              <label className="label text-primary font-medium">Location</label>
              <input
                type="text"
                {...register("location")}
                defaultValue={profile.profile?.location}
                className="input input-bordered w-full bg-base-100 text-base-content"
              />
            </div>
          </div>

          <div className="md:col-span-2 text-end mt-6">
            <button
              type="submit"
              className="btn btn-primary px-10 hover:shadow-lg transition-all"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentProfile;
