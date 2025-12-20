import React from "react";
import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: "https://e-tuition-server-khaki.vercel.app",
});


const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
