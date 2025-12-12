import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaLocationDot } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyTuitions = () => {
const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: myTuitions = [] } = useQuery({
    queryKey: ["myTuitions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions?email=${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-primary mb-6">
        My Posted Tuitions :{myTuitions.length}
      </h1>

      <div className="overflow-x-auto rounded-xl shadow bg-base-100 border border-base-300">
        <table className="table">
          <thead className="bg-primary text-base-100">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Subject</th>
              <th>Class</th>
              <th>Salary</th>
              <th>Days Per Week</th>
              <th>Status</th>
              <th>Posted</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {myTuitions.map((tuition, idx) => (
              <tr key={tuition._id} className="hover:bg-base-200">
                <td>{idx + 1}</td>

                <td className="font-semibold text-primary">{tuition.title}</td>

                <td className="text-secondary">{tuition.subject}</td>

                <td>{tuition.class}</td>

                <td className="font-medium text-accent">৳{tuition.salary}</td>

                <td>{tuition.daysPerWeek} days</td>

                <td>
                  <span
                    className={`badge ${
                      tuition.status === "Approved"
                        ? "badge-primary"
                        : "badge-secondary"
                    }`}
                  >
                    {tuition.status}
                  </span>
                </td>

                <td>{tuition.postedDate}</td>
                <td className="flex gap-1">
                  <Link to={`/tuitions/${tuition._id}/details`} className="btn btn-xs btn-primary">View</Link>
                  <button className="btn btn-xs btn-accent">Edit</button>
                  <button className="btn btn-xs btn-error ">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTuitions;
