import React from "react";
import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {loginUser,setUser}=useAuth();

  const handleLogin = (data) => {
   loginUser(data.email,data.password)
   .then(data=>{
    setUser(data.user);
    console.log(data.user)
   })
   .catch(error=>{
    console.log(error.code,error.message)
   })
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200 px-4">
      <div className="card w-full max-w-sm shadow-lg bg-base-100 py-8 px-6">
        <h2 className="text-3xl font-semibold text-center text-primary mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit(handleLogin)}>
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

          {/* Login button */}
          <button className="btn btn-primary w-full mb-3">Login</button>

          {/* Google Login */}
          <button
            type="submit"
            className="btn w-full gap-2 bg-white border border-gray-300 hover:bg-base-200"
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>
        </form>

        {/* register link */}
        <p className="text-center mt-4">
          New here?{" "}
          <Link to="/register" className="text-secondary font-medium">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
