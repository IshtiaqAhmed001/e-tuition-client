import { motion } from "framer-motion";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "How do I post a tuition request?",
    answer:
      "Students can post a tuition by logging in and filling out the tuition form with details like subject, class, budget, and schedule.",
  },
  {
    question: "How does tutor verification work?",
    answer:
      "All tutors are verified by our admin team to ensure credibility and quality before they can apply to tuition requests.",
  },
  {
    question: "Can I pay securely through the platform?",
    answer:
      "Yes! All payments are processed securely through our integrated system to ensure safety and transparency.",
  },
  {
    question: "How do I become a verified tutor?",
    answer:
      "Tutors can register and submit their documents. Our admin team reviews and approves verified tutors for better matching with students.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-neutral">
      <div className="max-w-7xl mx-auto px-5">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-base-content mb-3">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <div className="flex justify-center mb-10">
            <span className="w-20 h-1 bg-accent rounded-full"></span>
          </div>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Answers to the most common questions from students and tutors.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = index === openIndex;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-base-100 rounded-2xl shadow p-5 cursor-pointer hover:shadow-lg transition"
              >
                <div
                  className="flex justify-between items-center"
                  onClick={() => toggle(index)}
                >
                  <h4 className="font-semibold text-primary text-lg">
                    {faq.question}
                  </h4>
                  <span className="text-secondary">
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </div>
                {isOpen && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="text-base-content/70 mt-3"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
