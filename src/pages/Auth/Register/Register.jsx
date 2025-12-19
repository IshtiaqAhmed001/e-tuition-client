import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../../../components/SocialLogin/SocialLogin";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const { registerUser, updateUser, setUser, setLoading } = useAuth();

  const axiosSecure = useAxiosSecure();

  const handleRegister = (data) => {
    // update user profile to firebase
    const updatedProfile = {
      displayName: data.name,
      photoURL: data.photo,
    };

    registerUser(data.email, data.password)
      .then((result) => {
        setUser(result.user);
        setLoading(false);
        // update user profile to firebase
        updateUser(updatedProfile)
          .then(() => {
            const userInfo = {
              name: data.name,
              email: data.email,
              photo: data.photo,
              phone:data.phone,
              role: data.role,
            };

            axiosSecure
              .post("/users", userInfo)
              .then((res) => {
                navigate(location.state || "/");
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error.message));
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200 px-4">
      <div className="card w-full max-w-sm shadow-lg bg-base-100 py-8 px-6">
        <h2 className="text-3xl font-semibold text-center text-primary mb-6">
          Register
        </h2>

        <form onSubmit={handleSubmit(handleRegister)}>
          {/* Name */}
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="John Doe"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">Name is required</p>
            )}
          </div>

          {/* photoURL */}
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-medium">Photo URL</span>
            </label>
            <input
              {...register("photo", { required: true })}
              type="text"
              placeholder="https://your-photo.jpg"
              className="input input-bordered w-full"
            />
            {errors.photoURL && (
              <p className="text-red-500 text-sm mt-1">Photo URL is required</p>
            )}
          </div>

          {/* Email */}
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="email@example.com"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>
          {/* Email */}
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-medium">Phone</span>
            </label>
            <input
              {...register("phone", { required: true })}
              type="tel"
              placeholder="+880 **** *** *** "
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Phone number is required</p>
            )}
          </div>

          {/* Role */}
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-medium">Select Role</span>
            </label>

            <select
              {...register("role", { required: true })}
              className="select select-bordered w-full"
              defaultValue=""
            >
              <option value="" disabled>
                Choose your role
              </option>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
            </select>

            {errors.role && (
              <p className="text-red-500 text-sm mt-1">Role is required</p>
            )}
          </div>

          {/* Password */}
          <div className="form-control w-full mb-6">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="••••••"
              className="input input-bordered w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">Password is required</p>
            )}
          </div>

          <button className="btn btn-primary w-full mb-3">Register</button>

          <SocialLogin />
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-secondary font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
