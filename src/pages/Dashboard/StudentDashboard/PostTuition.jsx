import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PostTuition = () => {
  const { user } = useAuth();
const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
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
      schedule: data?.schedule ? data.schedule: 'evening',
      status: 'pending',
      gender:data.gender,
      additionalNotes:data.notes,
    };

 axiosSecure.post('/tuitions',newPost)
 .then(res=>{
    if(res.data.insertedId){
        console.log('New tuition posted: ',res.data)
    }
 }).catch(error=>{
    console.log(error)
 })
  };

  return (
    <div className="min-h-screen flex justify-center items-start py-10 bg-base-200 px-4">
      <div className="card w-full max-w-5xl shadow-lg bg-base-100 py-10 px-8">
        <h2 className="text-3xl font-semibold text-center text-primary mb-8">
          Post a Tuition
        </h2>

        <form onSubmit={handleSubmit(handlePost)}>
          {/* GRID wrapper */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* LEFT SIDE – Tuition details */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary mb-3">
                Tuition Details
              </h3>

              {/* Title */}
              <div>
                <label className="label text-primary font-medium">
                  Tuition Title
                </label>
                <input
                  {...register("title", { required: true })}
                  type="text"
                  placeholder="Need Math Tutor for Class 9"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Subjects */}
              <div>
                <label className="label text-primary font-medium">
                  Subjects
                </label>
                <input
                  {...register("subject", { required: true })}
                  type="text"
                  placeholder="Math, Physics"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Class */}
              <div>
                <label className="label text-primary font-medium">Class</label>
                <input
                  {...register("class", { required: true })}
                  type="text"
                  placeholder="Class 9 / HSC / University"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Days */}
              <div>
                <label className="label text-primary font-medium">
                  Days Per Week
                </label>
                <input
                  {...register("daysPerWeek", { required: true })}
                  type="number"
                  placeholder="3 days"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Salary */}
              <div>
                <label className="label text-primary font-medium">
                  Salary Range
                </label>
                <input
                  {...register("salary", { required: true })}
                  type="text"
                  placeholder="Enter amount here"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Location */}
              <div>
                <label className="label text-primary font-medium">
                  Location
                </label>
                <input
                  {...register("location", { required: true })}
                  type="text"
                  placeholder="Dhanmondi, Dhaka"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Personal info */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary mb-3">
                Your Information
              </h3>

              {/* Name */}
              <div>
                <label className="label text-primary font-medium">Name</label>
                <input
                  defaultValue={user?.displayName}
                  {...register("name", { required: true })}
                  type="text"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Email */}
              <div>
                <label className="label text-primary font-medium">Email</label>
                <input
                  defaultValue={user?.email}
                  disabled
                  type="email"
                  className="input input-bordered w-full bg-base-200"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="label text-primary font-medium">Phone</label>
                <input
                  {...register("phone", { required: true })}
                  type="text"
                  placeholder="01XXXXXXXXX"
                  className="input input-bordered w-full"
                />
              </div>
              {/* gender */}
              <div>
                <label className="label text-primary font-medium">Gender Preference</label>
                <input
                  {...register("gender", { required: true })}
                  type="text"
                  placeholder="Male or Female"
                  className="input input-bordered w-full"
                />
              </div>
              {/* Schedule */}
              <div>
                <label className="label text-primary font-medium">Timing Schedule</label>
                <input
                  {...register("schedule", { required: true })}
                  type="text"
                  placeholder="Morning | Afternoon | Evening"
                  className="input input-bordered w-full"
                />
              </div>
            

              {/* Notes */}
              <div>
                <label className="label text-primary font-medium">
                  Additional Notes
                </label>
                <textarea
                  {...register("notes")}
                  rows={4}
                  placeholder="Student has school after 2 PM, etc"
                  className="textarea textarea-bordered w-full"
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full mt-10">
            Post Tuition
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostTuition;
