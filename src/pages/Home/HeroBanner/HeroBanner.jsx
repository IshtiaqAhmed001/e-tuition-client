import { motion } from "framer-motion";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserShield,
} from "react-icons/fa";
import { Link } from "react-router";

const HeroBanner = () => {
  return (
    <section className="bg-neutral overflow-hidden px-4 md:px-0">
      <div className="max-w-7xl mx-auto py-20 md:py-24 grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-800">
            A Smarter Platform for
            <br />
            <span className="text-primary"> Tuition Management</span>
          </h1>

          <p className="mt-5 sm:mt-6 text-base sm:text-lg text-gray-600 max-w-xl">
            A complete system where students post tuition needs, tutors apply to
            verified opportunities, and admins ensure quality, transparency, and
            trust.
          </p>

          <div className="mt-7 sm:mt-8 flex flex-wrap gap-4">
            <Link to="/register" className="btn btn-primary">
              <FaUserGraduate />
              Post a Tuition
            </Link>

            <Link to="/tuitions" className="btn btn-outline btn-secondary">
              <FaChalkboardTeacher />
              Browse Tuitions
            </Link>
          </div>
        </motion.div>

        {/* RIGHT VISUAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          {/* Decorative blobs */}
          <div className="absolute -top-10 -left-10 md:-top-20 md:-left-20 w-36 h-36 sm:w-40 sm:h-40 md:w-60 md:h-60 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 md:-bottom-16 md:-right-16 w-36 h-36 sm:w-40 sm:h-40 md:w-60 md:h-60 bg-accent/30 rounded-full blur-3xl"></div>

          {/* Card */}
          <div className="relative bg-white rounded-2xl shadow-xl p-8 sm:p-10">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-5 sm:mb-6">
              Built for Everyone
            </h3>

            <div className="space-y-4 text-sm sm:text-base">
              <div className="flex items-center gap-3">
                <FaUserGraduate className="text-primary text-lg sm:text-xl" />
                <span className="text-gray-700">
                  Students find trusted tutors faster
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FaChalkboardTeacher className="text-secondary text-lg sm:text-xl" />
                <span className="text-gray-700">
                  Tutors apply to real tuition posts
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FaUserShield className="text-accent text-lg sm:text-xl" />
                <span className="text-gray-700">
                  Admins manage & monitor the platform
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;
