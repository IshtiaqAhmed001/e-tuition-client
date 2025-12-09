import React from "react";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useRole = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: role = "student", isLoading: roleLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user.email}/role`);
      return res.data?.role || "student";
    },
  });

  return { role, roleLoading };
};

export default useRole;
