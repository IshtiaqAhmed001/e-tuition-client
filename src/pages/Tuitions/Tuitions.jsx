import React, { useState } from "react";
import Tuition from "./Tuition";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../components/Loading/Loading";
import { FaSearch } from "react-icons/fa";
import SkeletonTuition from "./SkeletonTuition";

const Tuitions = () => {
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 8;

  const { data: tuitionsData = [], isLoading } = useQuery({
    queryKey: ["tuitionsData"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tuitions");
      return res.data;
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });

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
    <section className="py-12 bg-base-200">
      <div className="max-w-7xl mx-auto px-5 space-y-10">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-base-content mb-3">
            Current <span className="text-primary">Tuitions</span>
          </h2>
          <div className="flex justify-center mb-6">
            <span className="w-20 h-1 bg-accent rounded-full"></span>
          </div>
          <p className="text-base-content/70 max-w-xl mx-auto">
            Browse through the latest tuition requests and find the perfect
            match.
          </p>
        </div>

        {/* Search bar */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-md">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-base-content/60 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by title or location..."
              className="input w-full pl-10 bg-base-100 text-base-content rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* Results count */}
        <p className="text-center text-sm text-base-content/70">
          Found{" "}
          <span className="font-semibold text-primary">
            {filteredTuitions.length}
          </span>{" "}
          tuition{filteredTuitions.length !== 1 && "s"}
        </p>

        {/* Tuition grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            [...Array(4)].map((_, idx) => <SkeletonTuition key={idx} />)
          ) : currentTuitions.length > 0 ? (
            currentTuitions.map((tuition) => (
              <Tuition
                tuition={tuition}
                key={tuition._id}
                className="bg-base-100 rounded-2xl shadow hover:shadow-lg transition p-5"
              />
            ))
          ) : (
            <p className="text-center col-span-full text-base-content/60">
              No tuitions found
            </p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num + 1)}
                className={`btn btn-sm ${
                  currentPage === num + 1
                    ? "btn-primary"
                    : "btn-outline text-base-content/70"
                }`}
              >
                {num + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Tuitions;
