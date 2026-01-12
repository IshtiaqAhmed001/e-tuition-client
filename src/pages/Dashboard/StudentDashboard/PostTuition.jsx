import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PostTuition = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm();

  const handlePost = (data) => {
    const newPost = {
      title: data.title,
      subject: data.subject,
      class: data.class,
      location: data.location,
      salary: data.salary,
      daysPerWeek: data.daysPerWeek,
      schedule: data?.schedule ? data.schedule : "evening",
      status: "pending",
      gender: data.gender,
      additionalNotes: data.notes,
      postedBy:user?.displayName || user?.email
    };

    axiosSecure
      .post("/tuitions", newPost)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Tuition Posted!",
            text: "Your tuition has been posted successfully.",
            confirmButtonColor: "#007C63",
          });
          reset();
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Failed to Post Tuition",
          text: error.message || "Something went wrong!",
          confirmButtonColor: "#FFD166",
        });
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-start py-12 bg-neutral/50 px-4">
      <div className="w-full max-w-5xl bg-neutral border border-accent/20 rounded-3xl shadow-lg py-10 px-8 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-10">
          Post a Tuition
        </h2>

        <form onSubmit={handleSubmit(handlePost)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* LEFT SIDE */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                Tuition Details
              </h3>

              {[
                "title",
                "subject",
                "class",
                "daysPerWeek",
                "salary",
                "location",
              ].map((field) => (
                <div key={field}>
                  <label className="label text-primary font-medium capitalize">
                    {field === "class"
                      ? "Class"
                      : field.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    {...register(field, { required: true })}
                    type={field === "daysPerWeek" ? "number" : "text"}
                    placeholder={`Enter ${field} here`}
                    className="input input-bordered w-full bg-base-100 text-base-content placeholder:text-gray-400"
                  />
                </div>
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                Your Information
              </h3>

              {[
                { label: "Name", key: "name", defaultValue: user?.displayName },
                {
                  label: "Email",
                  key: "email",
                  defaultValue: user?.email,
                  disabled: true,
                },
                { label: "Phone", key: "phone", placeholder: "01XXXXXXXXX" },
                {
                  label: "Gender Preference",
                  key: "gender",
                  placeholder: "Male or Female",
                },
                {
                  label: "Timing Schedule",
                  key: "schedule",
                  placeholder: "Morning | Afternoon | Evening",
                },
              ].map((field) => (
                <div key={field.key}>
                  <label className="label text-primary font-medium">
                    {field.label}
                  </label>
                  <input
                    {...register(field.key, { required: !field.disabled })}
                    type="text"
                    defaultValue={field.defaultValue}
                    disabled={field.disabled}
                    placeholder={field.placeholder}
                    className={`input input-bordered w-full bg-base-100 text-base-content placeholder:text-gray-400 ${
                      field.disabled ? "bg-base-200 cursor-not-allowed" : ""
                    }`}
                  />
                </div>
              ))}

              <div>
                <label className="label text-primary font-medium">
                  Additional Notes
                </label>
                <textarea
                  {...register("notes")}
                  rows={4}
                  placeholder="Student has school after 2 PM, etc"
                  className="textarea textarea-bordered w-full bg-base-100 text-base-content placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mt-12 hover:shadow-lg transition-all"
          >
            Post Tuition
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostTuition;
