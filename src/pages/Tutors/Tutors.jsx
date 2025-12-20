import React from "react";
import { FaEnvelope, FaUserTie, FaLocationDot } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading/Loading";

const Tutors = () => {
  const axiosSecure = useAxiosSecure();
  const { data: tutors = [],isLoading } = useQuery({
    queryKey: ["tutors"],
    queryFn: async () => {
      const result = await axiosSecure.get("/users/tutors");
      return result.data;
    },
  });
    if (isLoading) {
      return <Loading />;
    }

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-primary mb-6">Tutor Directory</h1>

      <div className="overflow-x-auto rounded-xl shadow bg-neutral border border-accent/30 mb-10">
        <table className="table">
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
              <tr key={idx} className="hover:bg-accent/20">
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
                      <p className="font-semibold text-primary">{tutor.name}</p>
                      <span className="text-xs flex items-center gap-1 text-gray-600">
                        <FaLocationDot />
                        {tutor?.profile?.location}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="font-medium text-secondary">
                  {tutor?.profile?.teachingSubject?.join(", ")}
                </td>

                <td>{tutor?.profile?.experience} years</td>

            
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tutors;
