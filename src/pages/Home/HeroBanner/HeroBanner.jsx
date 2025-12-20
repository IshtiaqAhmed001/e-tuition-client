import { motion } from "framer-motion";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserShield,
} from "react-icons/fa";
import { Link } from "react-router";

const HeroBanner = () => {
  return (
    <section className="bg-neutral">
      <div className="max-w-7xl mx-auto py-24 grid md:grid-cols-2 gap-16 items-center">
    
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-800">
            A Smarter Platform for
            <br />
            <span className="text-primary"> Tuition Management</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            A complete system where students post tuition needs, tutors apply to
            verified opportunities, and admins ensure quality, transparency, and
            trust.
          </p>

          <div className="mt-8 flex gap-4">
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

      
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
        
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-accent/30 rounded-full blur-3xl"></div>

          <div className="relative bg-white rounded-2xl shadow-xl p-10">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Built for Everyone
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaUserGraduate className="text-primary text-xl" />
                <span className="text-gray-700">
                  Students find trusted tutors faster
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FaChalkboardTeacher className="text-secondary text-xl" />
                <span className="text-gray-700">
                  Tutors apply to real tuition posts
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FaUserShield className="text-accent text-xl" />
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
