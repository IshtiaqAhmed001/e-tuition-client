import { motion } from "framer-motion";
import { FaBook } from "react-icons/fa";
import { Link } from "react-router";

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "5 Tips to Find the Best Tuition",
    snippet:
      "Learn how to choose the right tutor for your child quickly and safely.",
    image: "https://i.ibb.co/s9R6swFL/download.png",
    link: "",
  },
  {
    id: 2,
    title: "How Tutors Can Boost Their Profile",
    snippet:
      "Step-by-step guide to create a strong tutor profile that attracts students.",
    image: "https://i.ibb.co/nM1ZQfYM/download-2.jpg",
    link: "",
  },
  {
    id: 3,
    title: "Secure Payments and Transparency",
    snippet:
      "How our platform ensures safe payments and maintains trust between users.",
    image: "https://i.ibb.co/jkqWcCc1/Capture.jpg",
    link: "",
  },
];

const Blogs = () => {
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
            Latest <span className="text-primary">Knowledge</span>
          </h2>
          <div className="flex justify-center mb-10">
            <span className="w-20 h-1 bg-accent rounded-full"></span>
          </div>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Stay informed with tips, guides, and news from our platform to
            enhance your learning journey.
          </p>
        </motion.div>

        {/* Blog Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-base-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex flex-col h-full">
                <h3 className="font-semibold text-primary text-lg mb-2">
                  {post.title}
                </h3>
                <p className="text-base-content/70 flex-1">{post.snippet}</p>
                <Link
                  to={post.link}
                  className="mt-4 inline-block text-secondary font-medium hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
