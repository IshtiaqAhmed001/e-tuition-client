import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const TutorProfile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset } = useForm();

  const {
    data: tutor = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["editTutor", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/profile`);
      return res.data;
    },
    enabled: !!user?.email,
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

    const res = await axiosSecure.patch(
      `/users/${user.email}/profile`,
      profileInfo
    );

    if (res.data.modifiedCount) {
      refetch();
      reset();
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };
  
  if (loading || isLoading || !tutor?.email) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-base-100 rounded-2xl shadow-lg border border-base-300 my-12">
      {/* Title */}
      <h2 className="text-3xl font-bold text-primary text-center mb-8">
        Tutor Profile
      </h2>

      {/* Profile Image */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-32 h-32 rounded-full overflow-hidden ring-2 ring-primary ring-offset-base-200 ring-offset-2 shadow-md">
          <img
            src={tutor.photo}
            alt="Tutor"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4"
      >
        <input
          disabled
          defaultValue={tutor.name}
          className="input input-bordered w-full bg-base-200"
        />

        <input
          disabled
          defaultValue={tutor.email}
          className="input input-bordered w-full bg-base-200"
        />

        <input
          {...register("phone")}
          defaultValue={tutor.profile.phone}
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
          defaultValue={tutor.profile.gender}
          className="select select-bordered w-full"
        >
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input
          {...register("qualification", { required: true })}
          defaultValue={tutor.profile.qualification}
          placeholder="Qualification"
          className="input input-bordered w-full"
        />

        <input
          {...register("experience", { required: true })}
          type="number"
          defaultValue={tutor.profile.experience}
          placeholder="Experience"
          className="input input-bordered w-full"
        />

        <input
          {...register("teachingSubject", { required: true })}
          defaultValue={tutor.profile.teachingSubject?.join(", ")}
          placeholder="Subjects: Math, Physics"
          className="input input-bordered w-full"
        />

        <input
          type="number"
          {...register("expectedSalary", { required: true })}
          defaultValue={tutor.profile.expectedSalary}
          placeholder="Expected Salary"
          className="input input-bordered w-full"
        />

        <input
          {...register("location", { required: true })}
          defaultValue={tutor.profile.location}
          placeholder="Location"
          className="input input-bordered w-full"
        />

        <button className="btn btn-primary w-full mt-4">Update Profile</button>
      </form>
    </div>
  );
};

export default TutorProfile;
