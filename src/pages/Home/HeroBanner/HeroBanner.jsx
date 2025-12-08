import React from 'react';

import bannerImg from '../../../assets/bannerImg.jpg';
import { Link } from 'react-router';

const HeroBanner = () => {
    return (
      <section className="bg-neutral">
        <div className="max-w-7xl mx-auto px-5 md:px-0 py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* LEFT TEXT SECTION */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-primary">
              Find the Right Tutor for Any Subject, Anytime.
            </h1>

            <p className="mt-4 text-gray-600 text-lg">
              Connecting students and tutors with flexible schedules, verified
              profiles, and a smooth learning experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/tuitions"
                className="btn bg-primary border-none text-white hover:bg-secondary"
              >
                Find Tuitions
              </Link>

              <Link
                to="/tutors"
                className="btn bg-secondary border-none text-neutral hover:bg-primary"
              >
                Find Tutors
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE SECTION */}
          <div className="flex justify-end  md:h-80">
            <img
              src={bannerImg}
              alt="Students learning"
              className="w-full  rounded-xl shadow-md"
            />
          </div>
        </div>
      </section>
    );
};

export default HeroBanner;