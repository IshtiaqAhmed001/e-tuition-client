import { useQuery } from "@tanstack/react-query";
import Slider from "../../../components/Slider/Slider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const TopTutors = () => {
  const axiosSecure = useAxiosSecure();
  const { data: topTutors = [] } = useQuery({
    queryKey: ["topTutors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/topTutors");
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
