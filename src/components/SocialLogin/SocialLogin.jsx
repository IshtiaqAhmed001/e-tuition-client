import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const SocialLogin = () => {
  const { setUser, loginWithGoogle } = useAuth();
  const axiosPublic = useAxiosPublic();
  const handleGoogleSignIn = () => {
    const location = useLocation();
    const navigate = useNavigate();

    loginWithGoogle().then((res) => {
      setUser(res.user);
      const newUser = {
        name: res.user.displayName,
        email: res.user.email,
        photo: res.user.photoURL,
        role: "student",
      };

      axiosPublic
        .post("/users", newUser)
        .then((res) => {
          navigate(location.state || "/");
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      type="button"
      className="btn w-full gap-2 bg-white border border-gray-300 hover:bg-base-200"
    >
      <FcGoogle className="text-xl" />
      Login with Google
    </button>
  );
};

export default SocialLogin;
