import { useQuery } from "@tanstack/react-query";
import Slider from "../../../components/Slider/Slider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../components/Loading/Loading";

const TopTutors = () => {
  const axiosPublic = useAxiosPublic();

  const { data: topTutors = [], isLoading } = useQuery({
    queryKey: ["topTutors"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users/tutors/topTutors");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="py-16 bg-neutral">
      <div className="max-w-7xl mx-auto px-5">
        {/* section title */}
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-primary mb-6">
          Top Tutors
        </h2>

        {/* accent bar */}
        <div className="mx-auto w-20 h-1 bg-accent rounded-full mb-10"></div>

        {/* MOBILE VIEW (GRID) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:hidden">
          {topTutors.slice(0, 4).map((tutor) => (
            <div
              key={tutor._id}
              className="bg-white rounded-lg shadow p-5 text-center"
            >
              <img
                src={tutor.photoURL}
                alt={tutor.name}
                className="w-20 h-20 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="font-semibold text-primary">{tutor.name}</h3>
              <p className="text-sm text-gray-600">
                {tutor.subject || "Experienced Tutor"}
              </p>
            </div>
          ))}
        </div>

        {/* DESKTOP / TABLET VIEW (SLIDER) */}
        <div className="hidden md:block">
          <Slider key={topTutors.length} topTutors={topTutors} />
        </div>
      </div>
    </section>
  );
};

export default TopTutors;
