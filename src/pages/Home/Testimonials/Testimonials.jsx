import { motion } from "framer-motion";
import { FaQuoteLeft, FaUserGraduate } from "react-icons/fa";

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Ahmed",
    role: "Student",
    photo: "https://i.ibb.co/FbV2hVXy/uifaces-human-avatar-4.jpg",
    message:
      "Posting my tuition on this platform was super easy. I found a verified tutor in just 2 days!",
  },
  {
    id: 2,
    name: "Rashed Khan",
    role: "Tutor",
    photo: "https://i.ibb.co/QjvYXHHh/uifaces-human-avatar-6.jpg",
    message:
      "I love how the system verifies every student and tuition request. It saves so much time and avoids misunderstandings.",
  },
  {
    id: 3,
    name: "Nadia Rahman",
    role: "Student",
    photo: "https://i.ibb.co/TQPW9HY/uifaces-human-avatar-3.jpg",
    message:
      "The platform is very transparent, and the payment system is secure. I highly recommend it to fellow students.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-neutral">
      <div className="max-w-7xl mx-auto px-5">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-base-content mb-3">
            What Our <span className="text-primary">Users Say</span>
          </h2>

          <div className="flex justify-center mb-10">
            <span className="w-20 h-1 bg-accent rounded-full"></span>
          </div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Real reviews from students and tutors using the platform every day.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.5, delay: t.id * 0.1 }}
              className="bg-base-100 rounded-2xl shadow-lg p-6 flex flex-col h-full"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent flex-shrink-0">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-primary">{t.name}</h4>
                  <p className="text-gray-400">{t.role}</p>
                </div>
              </div>

              <div className="flex-1 text-base-content/70 text-sm sm:text-base">
                <FaQuoteLeft className="text-accent text-lg mb-2" />
                <p>{t.message}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
