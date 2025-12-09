import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const MyTuitions = () => {
    const axiosPublic = useAxiosPublic();
    const {data:myTuitions=[]} = useQuery({
        queryKey:['myTuitions'],
        queryFn: async()=>{
const res = await axiosPublic.get("/tuitions");
return res.data
        }
    })
  return (
    <div>
      <h1>ALl of my posted tuitions : {myTuitions.length}</h1>
    </div>
  );
};

export default MyTuitions;
