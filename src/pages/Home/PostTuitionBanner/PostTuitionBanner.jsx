import { Link } from "react-router";
import { motion } from "framer-motion";
import useAuth from "../../../hooks/useAuth";

const PostTuitionBanner = () => {
  const { user } = useAuth();

  return (
    <section className="relative py-20 bg-gradient-to-r from-primary to-secondary text-white">
      {/* Dark overlay for better contrast in dark mode */}
      <div className="absolute inset-0 bg-black/25"></div>

      <motion.div
        className="relative max-w-7xl mx-auto text-center px-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Want to Post Your Tuition?
        </h2>
        <p className="text-lg md:text-xl mb-8">
          {user
            ? "Start your journey now and find the perfect tutor for your needs."
            : "Log in now to post your tuition and get matched with verified tutors!"}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to={user ? "/dashboard/student/post-tuition" : "/login"}
            className="btn btn-lg bg-white text-primary font-bold hover:bg-gray-100 shadow-none border-0"
          >
            {user ? "Post Tuition" : "Login to Post"}
          </Link>

          {!user && (
            <Link
              to="/register"
              className="btn btn-lg bg-accent text-black font-bold hover:bg-accent/80 shadow-none border-0"
            >
              Register as Student
            </Link>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default PostTuitionBanner;
