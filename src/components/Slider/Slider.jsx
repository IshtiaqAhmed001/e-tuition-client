import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function Slider({ topTutors }) {
  if (!topTutors?.length) return null;

  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "free",
    slides: {
      perView: 4,
      spacing: 15,
    },
  });

  return (
    <div ref={sliderRef} className="keen-slider my-10">
      {topTutors.map((tutor, i) => (
        <div key={i} className="keen-slider__slide p-4">
          <div className="bg-neutral p-5 rounded-xl shadow text-center">
            <img
              src={tutor.image}
              className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-primary"
            />
            <h2 className="font-bold text-primary mt-3">{tutor.name}</h2>
            <p className="text-secondary text-sm">
              Experience: {tutor.experience}
            </p>
            <p className="text-secondary">{tutor.teachingSubject.join(", ")}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
