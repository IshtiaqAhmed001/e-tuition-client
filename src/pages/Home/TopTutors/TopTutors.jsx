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
    <div>
      <h2>{topTutors.length}</h2>

    <Slider topTutors={topTutors}></Slider>
    </div>
  );
};

export default TopTutors;
