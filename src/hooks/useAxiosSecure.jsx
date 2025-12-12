import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // intercept request
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`;
        return config;
      }
    );

    // intercept response
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const statusCode = error.status;
        if (statusCode === 401 || statusCode === 403) {
          return <Navigate to="/unauthorized"></Navigate>;
        }
        // if (statusCode === 401 || statusCode === 403) {
        //   logoutUser().then(() => {
        //     navigate("/");
        //   });
        // }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logoutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
