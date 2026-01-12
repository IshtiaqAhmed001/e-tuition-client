import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router";
const SocialLogin = () => {
  const {setUser,loginWithGoogle } = useAuth();
  const axiosPublic = useAxiosPublic();
    const location = useLocation();
    const navigate = useNavigate();

  const handleGoogleSignIn = () => {
  
    loginWithGoogle().then((res) => {
      setUser(res.user);
      const newUser = {
        name: res.user.displayName,
        email: res.user.email,
        photo: res.user.photoURL,
        role: "student",
      };
  navigate(location.state || "/", { replace: true });
      axiosPublic
        .post("/users", newUser)
        .then(() => {
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      type="button"
      className="
    btn w-full gap-2 
    bg-base-100 dark:bg-neutral 
    border border-gray-300 dark:border-gray-600 
    text-primary dark:text-neutral 
    hover:bg-base-200 dark:hover:bg-base-300
    transition-colors
  "
    >
      <FcGoogle className="text-xl" />
      Login with Google
    </button>
  );
};

export default SocialLogin;
