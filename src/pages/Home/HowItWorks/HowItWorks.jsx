import { motion } from "framer-motion";
import {
  FaClipboardList,
  FaUserShield,
  FaUserCheck,
  FaListUl,
  FaHandshake,
  FaCreditCard,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaClipboardList />,
      title: "Create Tuition Request",
      desc: "Students submit tuition needs including subject, class, budget, and schedule.",
    },
    {
      icon: <FaUserShield />,
      title: "Admin Verification",
      desc: "Admins review tuition details and verify authenticity before publishing.",
    },
    {
      icon: <FaUserCheck />,
      title: "Tutor Applies",
      desc: "Qualified tutors apply to suitable tuition posts with experience details.",
    },
    {
      icon: <FaListUl />,
      title: "Review Applications",
      desc: "Students review tutor profiles and shortlist the best match.",
    },
    {
      icon: <FaHandshake />,
      title: "Hire Tutor",
      desc: "Finalize tutor selection after mutual agreement.",
    },
    {
      icon: <FaCreditCard />,
      title: "Secure Payment",
      desc: "Complete payment securely and begin the tuition journey.",
    },
  ];

  return (
    <section className="py-24 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-base-content mb-4"
        >
          How It <span className="text-primary">Works</span>
        </motion.h2>

        {/* Accent Divider */}
        <div className="flex justify-center mb-10">
          <span className="w-20 h-1 bg-accent rounded-full"></span>
        </div>

        <p className="text-base-content/70 max-w-3xl mx-auto mb-16">
          A structured and transparent workflow that ensures quality tutoring,
          verified users, and secure payments.
        </p>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-base-100 rounded-2xl shadow-lg hover:shadow-xl transition p-8"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl mb-5">
                {step.icon}
              </div>

              <h3 className="text-lg font-semibold text-base-content mb-3">
                {step.title}
              </h3>

              <p className="text-sm text-base-content/70 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
