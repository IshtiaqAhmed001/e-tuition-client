import React from "react";
import { FaEnvelope, FaUserTie, FaLocationDot } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading/Loading";

const Tutors = () => {
  const axiosSecure = useAxiosSecure();
  const { data: tutors = [], isLoading } = useQuery({
    queryKey: ["tutors"],
    queryFn: async () => {
      const result = await axiosSecure.get("/users/tutors");
      return result.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page title */}
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-base-content mb-3">
          Tutor <span className="text-primary">Directory</span>
        </h2>
        <div className="flex justify-center mb-10">
          <span className="w-20 h-1 bg-accent rounded-full"></span>
        </div>
        <p className="text-base-content/70 text-center max-w-2xl mx-auto mb-12">
          Browse through our verified tutors and their expertise to find your
          perfect match.
        </p>

        {/* Table container */}
        <div className="overflow-x-auto rounded-2xl shadow-lg bg-base-100 border border-accent/30">
          <table className="table w-full">
            <thead className="bg-primary text-neutral">
              <tr>
                <th>#</th>
                <th>Tutor</th>
                <th>Subjects</th>
                <th>Experience</th>
              </tr>
            </thead>
            <tbody>
              {tutors.map((tutor, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-accent/20 transition-colors duration-200"
                >
                  <td className="font-medium">{idx + 1}</td>

                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={
                              tutor.photo ||
                              "https://img.daisyui.com/images/profile/demo/2@94.webp"
                            }
                            alt={tutor.name}
                          />
                        </div>
                      </div>

                      <div>
                        <p className="font-semibold text-primary">
                          {tutor.name}
                        </p>
                        <span className="text-xs flex items-center gap-1 text-base-content/70">
                          <FaLocationDot />
                          {tutor?.profile?.location || "N/A"}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="font-medium text-secondary">
                    {tutor?.profile?.teachingSubject?.join(", ") || "N/A"}
                  </td>

                  <td className="text-base-content/70">
                    {tutor?.profile?.experience ?? 0} years
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Tutors;
