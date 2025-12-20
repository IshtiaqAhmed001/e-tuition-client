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
    <section className="py-24 bg-neutral">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-primary mb-6"
        >
          How It Works
        </motion.h2>

        <p className="text-gray-600 max-w-3xl mx-auto mb-16">
          A structured and transparent workflow that ensures quality tutoring,
          verified users, and secure payments.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card bg-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="card-body items-center text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl mb-4">
                  {step.icon}
                </div>

                <h3 className="card-title text-secondary">{step.title}</h3>

                <p className="text-gray-600">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
