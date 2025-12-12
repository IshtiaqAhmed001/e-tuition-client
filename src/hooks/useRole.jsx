import React from "react";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
 const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: role = "student", isLoading: roleLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data?.role || "student";
    },
  });

  return { role, roleLoading };
};

export default useRole;
