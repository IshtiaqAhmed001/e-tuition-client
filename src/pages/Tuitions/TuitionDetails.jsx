import React, { useRef } from "react";
import { useParams } from "react-router";
import { FaLocationDot, FaUser, FaClock } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const TuitionDetails = () => {
    const {user}=useAuth();
    const {role}=useRole();
  const { id } = useParams();
const axiosSecure = useAxiosSecure();
  const applyModalRef = useRef();
   
  const {data:tuition ={}} = useQuery({
    queryKey:['tuition'],
    queryFn: async()=>{
const res = await axiosSecure.get(`/tuitions/${id}/details`);
return res.data;
    }
  })

 const {
     register,
     handleSubmit,
     reset,
     formState: { errors },
   } = useForm();
 
   const handleApply = async (data) => {
     const newApplication = {
       ...data,
       tuitionId:id,
       appliedDate: new Date(),
     };
 
  try {
    const res = await axiosSecure.post("/applications", newApplication);

    if (res.data?.insertedId) {
     Swal.fire({
       icon: "success",
       title: "Application Submitted!",
       text: "Your application has been sent successfully.",
       confirmButtonColor: "#007C63", // matches your primary color
     });
      reset();
      applyModalRef.current.close();
    }
  } catch (error) {
    console.error(error.message);
  }
   };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      {/* Title */}
      <h1 className="text-3xl font-bold text-primary mb-6">Tuition Details</h1>

      <div className="rounded-xl bg-neutral shadow border border-accent/30 p-8">
        <h2 className="text-2xl font-semibold text-primary mb-6">
          {tuition.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* left */}
          <div className="space-y-4">
            <p>
              <span className="font-semibold text-secondary">Subject:</span>{" "}
              {tuition.subject}
            </p>

            <p>
              <span className="font-semibold text-secondary">Class:</span>{" "}
              {tuition.class}
            </p>

            <p className="flex items-center gap-2">
              <FaLocationDot className="text-primary" />
              <span className="font-semibold text-secondary">
                Location:
              </span>{" "}
              {tuition.location}
            </p>

            <p>
              <span className="font-semibold text-secondary">Salary:</span>{" "}
              {tuition.salary} BDT
            </p>
          </div>

          {/* right */}
          <div className="space-y-4">
            <p>
              <span className="font-semibold text-secondary">Days/Week:</span>{" "}
              {tuition.daysPerWeek}
            </p>

            <p className="flex items-center gap-2">
              <FaClock className="text-primary" />
              <span className="font-semibold text-secondary">
                Schedule:
              </span>{" "}
              {tuition.schedule}
            </p>

            <p>
              <span className="font-semibold text-secondary">Status:</span>{" "}
              <span className="capitalize text-primary font-bold">
                {tuition.status}
              </span>
            </p>

            <p className="flex items-center gap-2">
              <FaUser className="text-primary" />
              <span className="font-semibold text-secondary">
                Posted By:
              </span>{" "}
              {tuition.postedBy}
            </p>

            <p>
              <span className="font-semibold text-secondary">Posted Date:</span>{" "}
              {new Date(tuition.postedDate).toLocaleString()}
            </p>
          </div>
        </div>

        {/*Apply button */}
        {role === "tutor" && (
          <div className="mt-10 text-center">
            <button
              onClick={() => applyModalRef.current.showModal()}
              className="btn btn-primary px-10 text-neutral hover:bg-secondary"
            >
              Apply Now
            </button>
          </div>
        )}
      </div>

      {/* apply modal  */}
      <>
        <dialog ref={applyModalRef} className="modal">
          <div className="modal-box bg-neutral text-primary border border-accent/30">
            <h3 className="font-bold text-2xl mb-6 text-primary">
              Apply for Tuition
            </h3>

            <form onSubmit={handleSubmit(handleApply)} className="space-y-4">
              {/* Name */}
              <div>
                <label className="label text-secondary font-medium">Name</label>
                <input
                  value={user?.displayName}
                  readOnly
                  className="input input-bordered w-full bg-base-200"
                />
              </div>

              {/* Email */}
              <div>
                <label className="label text-secondary font-medium">
                  Email
                </label>
                <input
                  value={user?.email}
                  readOnly
                  className="input input-bordered w-full bg-base-200"
                />
              </div>

              {/* Qualification */}
              <div>
                <label className="label text-secondary font-medium">
                  Qualifications
                </label>
                <input
                  {...register("qualification", { required: true })}
                  placeholder="Honors, BSc etc."
                  className="input input-bordered w-full"
                />
                {errors.qualification && (
                  <p className="text-red-500 text-sm">Required</p>
                )}
              </div>

              {/* Experience */}
              <div>
                <label className="label text-secondary font-medium">
                  Experience (years)
                </label>
                <input
                  {...register("experience", { required: true })}
                  type="number"
                  className="input input-bordered w-full"
                  placeholder="Enter experience in years"
                />
                {errors.experience && (
                  <p className="text-red-500 text-sm">Required</p>
                )}
              </div>

              {/* Expected Salary */}
              <div>
                <label className="label text-secondary font-medium">
                  Expected Salary
                </label>
                <input
                  {...register("expectedSalary", { required: true })}
                  type="number"
                  placeholder="Enter Amount in BDT"
                  className="input input-bordered w-full"
                />
              </div>

              {/* buttons */}
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>

                <button
                  type="button"
                  onClick={() => applyModalRef.current.close()}
                  className="btn btn-secondary"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </>
    </div>
  );
};

export default TuitionDetails;
