import React from "react";
import Tuition from "./Tuition";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../components/Loading/Loading";

const Tuitions = () => {
const axiosPublic = useAxiosPublic();    const {data:tuitionsData=[],isLoading} = useQuery({
      queryKey:['tuitionsData'],
      queryFn: async ()=>{
        const res = await axiosPublic.get('/tuitions');
        return res.data;
      }
    })
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="max-w-7xl mx-auto py-12 space-y-10">
      <h1 className="text-3xl font-bold text-center text-primary">
        Current Tuition Listings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tuitionsData.map((tuition) => (
          <Tuition tuition={tuition} key={tuition._id}></Tuition>
        ))}
      </div>
    </div>
  );
};

export default Tuitions;
