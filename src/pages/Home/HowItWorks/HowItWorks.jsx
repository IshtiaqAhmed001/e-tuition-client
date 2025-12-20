import { motion } from "framer-motion";

const HowItWorks = () => {
  return (
    <section className="py-16 bg-neutral">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-primary mb-10">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Post Tuition",
              desc: "Students post tuition requirements with subject, class & budget.",
            },
            {
              title: "Tutor Applies",
              desc: "Qualified tutors apply with experience and expected salary.",
            },
            {
              title: "Hire & Pay",
              desc: "Approve tutor and complete secure payment to start learning.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white p-6 rounded-lg shadow"
            >
              <h3 className="text-xl font-semibold text-secondary mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
