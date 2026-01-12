import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../../../components/SocialLogin/SocialLogin";

const Login = () => {
  const [authError, setAuthError] = useState(""); // for auth errors

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loginUser, setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    setAuthError(""); // reset previous error
    loginUser(data.email, data.password)
      .then((res) => {
        setUser(res.user);
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.log(error.code, error.message);
        // show human-readable error
        if (error.code === "auth/wrong-password") {
          setAuthError("Incorrect password. Please try again.");
        } else if (error.code === "auth/user-not-found") {
          setAuthError("No account found with this email.");
        } else {
          setAuthError("Login failed. Please try again.");
        }
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200 px-4">
      <div className="card w-full max-w-sm shadow-lg bg-base-100 dark:bg-neutral py-8 px-6 rounded-xl">
        <h2 className="text-3xl font-semibold text-center text-primary mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          {/* Email */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="email@example.com"
              className="input input-bordered w-full bg-base-200 dark:bg-base-300"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="••••••"
              className="input input-bordered w-full bg-base-200 dark:bg-base-300"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">Password is required</p>
            )}
            {authError && (
              <p className="text-red-500 text-sm mt-1">{authError}</p>
            )}
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="btn btn-primary w-full mt-2 hover:bg-secondary"
          >
            Login
          </button>

          {/* Social login */}
          <SocialLogin />
        </form>

        {/* Register link */}
        <p className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
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
