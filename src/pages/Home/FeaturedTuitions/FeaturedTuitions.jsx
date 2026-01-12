import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaMapMarkerAlt, FaBookOpen } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../components/Loading/Loading";
import heroCard from "../../../assets/herocard.jpg";

const FeaturedTuitions = () => {
  const axiosPublic = useAxiosPublic();

  const { data: tuitions = [], isLoading } = useQuery({
    queryKey: ["featuredTuitions"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tuitions");
      return res.data.slice(0, 4);
    },
  });

  if (isLoading) return <Loading />;
  if (!tuitions.length) return null;

  return (
    <section className="py-24 bg-neutral">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-center text-3xl md:text-4xl font-extrabold text-base-content mb-3">
            Featured <span className="text-primary">Tuitions</span>
          </h2>
          <div className="flex justify-center mb-10">
            <span className="w-20 h-1 bg-accent rounded-full"></span>
          </div>
          <p className="text-base-content/70 mt-2 max-w-xl">
            Recently approved tuition requests waiting for the right tutor.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* STATIC HERO CARD */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-base-100 rounded-3xl overflow-hidden shadow-lg"
          >
            {/* Banner */}
            <div className="relative h-56">
              <img
                src={heroCard}
                alt="Tuition Example"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30"></div>
              <span className="absolute bottom-4 left-4 bg-accent text-black px-4 py-1 rounded-full text-sm">
                Featured
              </span>
            </div>

            {/* Static Content */}
            <div className="p-8">
              <h3 className="text-2xl font-bold text-base-content mb-4">
                Physics Tutor Needed for Class 9
              </h3>

              <div className="flex flex-wrap gap-6 text-base-content/70 mb-5">
                <span className="flex items-center gap-2">
                  <FaBookOpen />
                  Science
                </span>
                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt />
                  Gulshan, Dhaka
                </span>
              </div>

              <p className="text-base-content/70 mb-6">
                Budget: ৳5000 • 3 days/week
              </p>

              <Link
                to="/tuitions"
                className="btn bg-secondary text-white border-0"
              >
                Browse All Tuitions
              </Link>
            </div>
          </motion.div>

          {/* DYNAMIC LIST */}
          <div className="space-y-6">
            {tuitions.map((tuition, index) => (
              <motion.div
                key={tuition._id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group bg-base-100 border-l-4 border-secondary rounded-xl p-5 hover:shadow-lg transition"
              >
                <h4 className="font-semibold text-base-content group-hover:text-primary transition">
                  {tuition.title}
                </h4>

                <p className="text-base-content/70 text-sm mt-2">
                  {tuition.subject} • {tuition.location}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-base-content/60 text-sm">
                    ৳{tuition.salary}
                  </span>

                  <Link
                    to={`/tuitions/${tuition._id}`}
                    className="text-primary font-medium"
                  >
                    View →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTuitions;
