import { motion } from "framer-motion";
import Swal from "sweetalert2";

const NewsLetter = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "success",
      title: "Subscribed!",
      text: `You have successfully subscribed with eTuitionBD`,
      timer: 2000,
      showConfirmButton: false,
    });
  
  
  };

  return (
    <section className="py-24 bg-neutral">
      <div className="max-w-3xl mx-auto px-5 text-center">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-base-content mb-3">
            Join Our <span className="text-primary">Newsletter</span>
          </h2>
          <div className="flex justify-center mb-8">
            <span className="w-20 h-1 bg-accent rounded-full"></span>
          </div>
          <p className="text-base-content/70">
            Get updates, tips, and notifications about new tuition posts and
            verified tutors directly in your inbox.
          </p>
        </motion.div>

        {/* Signup Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center gap-4 bg-base-100 p-6 rounded-2xl shadow-md"
        >
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-base-content/80 bg-base-100 placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition"
          >
            Subscribe
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default NewsLetter;
