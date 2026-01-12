import {
  FaChalkboardTeacher,
  FaClipboardList,
  FaHandshake,
} from "react-icons/fa";

const Stats = () => {
  const statsData = [
    {
      icon: <FaChalkboardTeacher />,
      value: "500+",
      title: "Verified Tutors",
    },
    {
      icon: <FaClipboardList />,
      value: "1,200+",
      title: "Tuition Posts",
    },
    {
      icon: <FaHandshake />,
      value: "3,000+",
      title: "Successful Matches",
    },
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-5">
        {/* Section Title */}
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-base-content mb-3">
          Platform <span className="text-primary">Statistics</span>
        </h2>
        <div className="flex justify-center mb-12">
          <span className="w-20 h-1 bg-accent rounded-full"></span>
        </div>

        {/* Stats Container */}
        <div className="flex flex-col sm:flex-row gap-6">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="stats shadow-lg hover:shadow-xl bg-base-100 flex-1 rounded-2xl transition"
            >
              <div className="stat text-center py-8">
                <div className="stat-figure text-primary text-4xl mx-auto mb-2">
                  {stat.icon}
                </div>
                <div className="stat-value text-primary text-3xl md:text-4xl font-bold">
                  {stat.value}
                </div>
                <div className="stat-title text-base-content/70 mt-2">
                  {stat.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
