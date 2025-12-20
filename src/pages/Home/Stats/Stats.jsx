import {
  FaChalkboardTeacher,
  FaClipboardList,
  FaHandshake,
} from "react-icons/fa";

const Stats = () => {
  return (
    <section className="py-16 bg-neutral">
      <div className="max-w-7xl mx-auto px-5">
        {/* Section title */}
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-primary mb-12">
          Platform Statistics
        </h2>

        {/* Stats container */}
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Tutors */}
          <div className="stats shadow bg-base-100 flex-1">
            <div className="stat text-center py-8">
              <div className="stat-figure text-secondary text-4xl mx-auto">
                <FaChalkboardTeacher />
              </div>
              <div className="stat-value text-primary">500+</div>
              <div className="stat-title text-gray-600">Verified Tutors</div>
            </div>
          </div>

          {/* Tuitions */}
          <div className="stats shadow bg-base-100 flex-1">
            <div className="stat text-center py-8">
              <div className="stat-figure text-secondary text-4xl mx-auto">
                <FaClipboardList />
              </div>
              <div className="stat-value text-primary">1,200+</div>
              <div className="stat-title text-gray-600">Tuition Posts</div>
            </div>
          </div>

          {/* Matches */}
          <div className="stats shadow bg-base-100 flex-1">
            <div className="stat text-center py-8">
              <div className="stat-figure text-secondary text-4xl mx-auto">
                <FaHandshake />
              </div>
              <div className="stat-value text-primary">3,000+</div>
              <div className="stat-title text-gray-600">Successful Matches</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
