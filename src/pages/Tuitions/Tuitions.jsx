import React, { useState } from "react";
import Tuition from "./Tuition";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../components/Loading/Loading";
import { FaSearch } from "react-icons/fa";

const Tuitions = () => {
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 6;

  const { data: tuitionsData = [], isLoading } = useQuery({
    queryKey: ["tuitionsData"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tuitions");
      return res.data;
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (isLoading) {
    return <Loading />;
  }

 
const filteredTuitions = tuitionsData.filter((tuition) => {
  const term = searchTerm.toLowerCase();

  return (
    tuition.title?.toLowerCase().includes(term) ||
    tuition.location?.toLowerCase().includes(term)
  );
});
 
  const totalPages = Math.ceil(filteredTuitions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTuitions = filteredTuitions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto py-12 space-y-10">
      <h1 className="text-3xl font-bold text-center text-primary">
        Current Tuition Listings
      </h1>

      <div className="flex justify-center">
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-base-content opacity-60 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by title or location..."
            className="input input-bordered w-full pl-10 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <p className="text-center text-sm text-base-content/70">
        Found{" "}
        <span className="font-semibold text-primary">
          {filteredTuitions.length}
        </span>{" "}
        tuition{filteredTuitions.length !== 1 && "s"}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentTuitions.length > 0 ? (
          currentTuitions.map((tuition) => (
            <Tuition tuition={tuition} key={tuition._id} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No tuitions found
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num + 1)}
              className={`btn btn-sm ${
                currentPage === num + 1 ? "btn-primary" : "btn-outline"
              }`}
            >
              {num + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tuitions;
