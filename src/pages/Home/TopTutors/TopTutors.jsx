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
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-5">
        {/* Section Title */}
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-base-content mb-4">
          Top <span className="text-primary">Tutors</span>
        </h2>

        {/* Accent Bar */}
        <div className="flex justify-center mb-10">
          <span className="w-20 h-1 bg-accent rounded-full"></span>
        </div>

        {/* MOBILE VIEW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:hidden items-stretch">
          {topTutors.slice(0, 4).map((tutor) => (
            <div
              key={tutor._id}
              className="bg-base-100 rounded-2xl shadow-lg hover:shadow-xl p-6 flex flex-col items-center text-center transition h-full"
            >
              <img
                src={tutor.photoURL}
                alt={tutor.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h3 className="font-semibold text-base-content mb-1">
                {tutor.name}
              </h3>
              <p className="text-sm text-base-content/70">
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
