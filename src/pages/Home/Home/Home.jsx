import React from "react";
import HeroBanner from "../HeroBanner/HeroBanner";
import TopTutors from "../TopTutors/TopTutors";
import HowItWorks from "../HowItWorks/HowItWorks";
import FeaturedTuitions from "../FeaturedTuitions/FeaturedTuitions";
import Stats from "../Stats/Stats";
const Home = () => {
  return (
    <div>
      <HeroBanner />
      <HowItWorks />
      <TopTutors />
      <FeaturedTuitions />
      <Stats />
      {/* <HomeCTA /> */}
    </div>
  );
};

export default Home;
