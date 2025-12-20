const Stats = () => {
  return (
    <section className="py-16 bg-neutral">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-extrabold text-primary">500+</h3>
            <p className="text-gray-600 mt-2">Verified Tutors</p>
          </div>

          <div>
            <h3 className="text-4xl font-extrabold text-primary">1,200+</h3>
            <p className="text-gray-600 mt-2">Tuition Posts</p>
          </div>

          <div>
            <h3 className="text-4xl font-extrabold text-primary">3,000+</h3>
            <p className="text-gray-600 mt-2">Successful Matches</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
