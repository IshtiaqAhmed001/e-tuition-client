import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const StudentProfile = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: profile = {} } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosPublic.get(`users/${user.email}/profile`);
      return res.data;
    },
  });
  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto bg-base-200 rounded-xl shadow-md border border-base-300 p-6">
        {/* Profile Header */}
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

        {/* Divider */}
        <div className="divider my-6"></div>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT COLUMN */}
          <div className="space-y-4">
            <div>
              <label className="label text-primary font-medium">
                Full Name
              </label>
              <input
                type="text"
                defaultValue={profile.name}
                className="input input-bordered w-full bg-base-100"
              />
            </div>

            <div>
              <label className="label text-primary font-medium">Email</label>
              <input
                type="email"
                defaultValue={profile.email}
                disabled
                className="input input-bordered w-full bg-base-100"
              />
            </div>

            <div>
              <label className="label text-primary font-medium">Role</label>
              <input
                type="text"
                defaultValue={profile.role}
                disabled
                className="input input-bordered w-full bg-base-100"
              />
            </div>

            <div>
              <label className="label text-primary font-medium">
                Photo URL
              </label>
              <input
                type="text"
                defaultValue={profile.photo}
                className="input input-bordered w-full bg-base-100"
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4">
            <div>
              <label className="label text-primary font-medium">Phone</label>
              <input
                type="text"
                placeholder="Optional"
                className="input input-bordered w-full bg-base-100"
              />
            </div>

            <div>
              <label className="label text-primary font-medium">
                Current Class
              </label>
              <input
                type="text"
                placeholder="Class 9 / HSC / University"
                className="input input-bordered w-full bg-base-100"
              />
            </div>

            <div>
              <label className="label text-primary font-medium">Location</label>
              <input
                type="text"
                placeholder="City / Area"
                className="input input-bordered w-full bg-base-100"
              />
            </div>
          </div>
        </form>

        {/* BIO */}
        <div className="mt-6">
          <label className="label text-primary font-medium">
            About Student
          </label>
          <textarea
            rows={4}
            className="textarea textarea-bordered w-full bg-base-100"
            placeholder="Tell tutors something about you"
          />
        </div>

        {/* SUBMIT */}
        <div className="text-end mt-6">
          <button className="btn btn-primary px-10">Save Profile</button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
