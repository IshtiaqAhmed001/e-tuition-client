import React from "react";
import HeroBanner from "../HeroBanner/HeroBanner";
import TopTutors from "../TopTutors/TopTutors";
import HowItWorks from "../HowItWorks/HowItWorks";
import FeaturedTuitions from "../FeaturedTuitions/FeaturedTuitions";
import Stats from "../Stats/Stats";
import PostTuitionBanner from "../PostTuitionBanner/PostTuitionBanner";
import Testimonials from "../Testimonials/Testimonials";
import Blogs from "./Blogs/Blogs";
import FAQ from "../FAQ/FAQ.JSX";
import NewsLetter from "../NewsLetter/NewsLetter";
const Home = () => {
  return (
    <div>
      <HeroBanner />
      <HowItWorks />
      <TopTutors />
      <FeaturedTuitions />
      <Stats />
      <Testimonials/>
      <PostTuitionBanner/>
      <Blogs/>
      <FAQ/>
      <NewsLetter/>
   
    </div>
  );
};

export default Home;
