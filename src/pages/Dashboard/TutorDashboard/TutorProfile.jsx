import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TutorProfile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset } = useForm();

  const {
    data: tutor = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["editTutor"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/profile`);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    const profileInfo = {
      photo: data.photo,
      phone: data.phone,
      gender: data.gender,
      qualification: data.qualification,
      experience: data.experience,
      teachingSubject: data.teachingSubject.split(",").map((s) => s.trim()),
      expectedSalary: Number(data.expectedSalary),
      location: data.location,
    };

    axiosPublic
      .patch(`/users/${user.email}/profile`, profileInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          reset();
          alert("Profile updated and marked as complete!");
        }
      });
  };

  if (loading || isLoading) return <Loading />;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-base-200 rounded-xl my-10">
      <h2 className="text-2xl font-semibold mb-4 text-primary">
        Tutor Profile
      </h2>

      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={tutor.photo}
          alt="Tutor"
          className="w-28 h-28 rounded-full border border-base-300 shadow"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* readonly locked fields */}
        <input
          {...register("name")}
          disabled
          defaultValue={tutor.name}
          className="input input-bordered w-full bg-base-300"
        />

        <input
          {...register("email")}
          disabled
          defaultValue={tutor.email}
          className="input input-bordered w-full bg-base-300"
        />

        {/* editable fields */}
        <input
          {...register("phone")}
          defaultValue={tutor.phone}
          placeholder="Phone"
          className="input input-bordered w-full"
        />

        <input
          {...register("photo")}
          defaultValue={tutor.photo}
          placeholder="Profile photo URL"
          className="input input-bordered w-full"
        />

        <select
          {...register("gender", { required: true })}
          defaultValue={tutor.gender}
          className="select select-bordered w-full"
        >
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input
          {...register("qualification", { required: true })}
          defaultValue={tutor.qualification}
          placeholder="Qualification"
          className="input input-bordered w-full"
        />

        <input
          {...register("experience", { required: true })}
          type="number"
          defaultValue={tutor.experience}
          placeholder="Experience"
          className="input input-bordered w-full"
        />

        <input
          {...register("teachingSubject", { required: true })}
          defaultValue={tutor.teachingSubject?.join(", ")}
          placeholder="Subjects: Math, Physics"
          className="input input-bordered w-full"
        />

        <input
          type="number"
          {...register("expectedSalary", { required: true })}
          defaultValue={tutor.expectedSalary}
          placeholder="Expected Salary"
          className="input input-bordered w-full"
        />

        <input
          {...register("location", { required: true })}
          defaultValue={tutor.location}
          placeholder="Location"
          className="input input-bordered w-full"
        />

        <button className="btn btn-primary w-full mt-4">Update Profile</button>
      </form>
    </div>
  );
};

export default TutorProfile;
