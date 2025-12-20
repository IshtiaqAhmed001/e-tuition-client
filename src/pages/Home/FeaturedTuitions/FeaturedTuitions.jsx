import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../components/Loading/Loading";

const FeaturedTuitions = () => {
  const axiosPublic = useAxiosPublic();

  const { data: tuitions = [], isLoading } = useQuery({
    queryKey: ["featuredTuitions"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tuitions");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-primary mb-6">
          Featured Tuitions
        </h2>
        <div className="mx-auto w-20 h-1 bg-accent rounded-full mb-10"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tuitions.slice(0, 6).map((tuition) => (
            <div
              key={tuition._id}
              className="border rounded-lg p-5 shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg text-primary mb-2">
                {tuition.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Salary: ৳{tuition.salary}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Days / Week: {tuition.daysPerWeek}
              </p>

              <Link
                to={`/tuitions`}
                className="text-secondary font-semibold text-sm"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTuitions;
