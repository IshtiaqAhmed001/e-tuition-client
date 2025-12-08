import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Slider from "../../../components/Slider/Slider";


const TopTutors = () => {
  const axiosPublic = useAxiosPublic();
  const { data: topTutors = [] } = useQuery({
    queryKey: ["topTutors"],
    queryFn: async () => {
      const res = await axiosPublic.get("/topTutors");
      return res.data;
    },
  });

   


  return (
    <section className="py-16 bg-neutral">
      <div className="max-w-7xl mx-auto px-5">
        {/* section title  */}
        <h2 className="text-center text-4xl font-extrabold text-primary mb-10">
          Top Tutors
        </h2>

        {/* small accent bar */}
        <div className="mx-auto w-24 h-1 bg-accent rounded-full mb-12"></div>

        {/* slider */}
        <Slider key={topTutors.length} topTutors={topTutors} />
      </div>
    </section>
  );
};

export default TopTutors;
