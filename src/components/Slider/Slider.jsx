import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./Slider.css";

const carousel = (slider) => {
  const z = 300;
  function rotate() {
    const deg = 360 * slider.track.details.progress;
    slider.container.style.transform = `translateZ(-${z}px) rotateY(${-deg}deg)`;
  }
  slider.on("created", () => {
    const deg = 360 / slider.slides.length;
    slider.slides.forEach((element, idx) => {
      element.style.transform = `rotateY(${deg * idx}deg) translateZ(${z}px)`;
    });
    rotate();
  });
  slider.on("detailsChanged", rotate);
};

export default function Slider({ topTutors }) {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      selector: ".carousel__cell",
      renderMode: "custom",
      mode: "free-snap",
    },
    [carousel]
  );

  return (
    <div className="wrapper mb-30">
      <div className="scene">
        <div className="carousel keen-slider" ref={sliderRef}>
          {topTutors.map((tutor, index) => (
            <div key={tutor._id || index} className="carousel__cell">
              <div className="w-56 h-72 p-5 rounded-2xl shadow-xl text-center bg-neutral flex flex-col justify-between hover:scale-105 duration-300">
                {/* name */}
                <h2 className="font-semibold text-primary text-xl">
                  {tutor.name}
                </h2>

                {/* image */}
                <img
                  src={tutor.image}
                  className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-primary"
                />

                {/* bottom */}
                <div>
                  <p className="text-secondary font-medium">
                    {tutor.teachingSubject.join(", ")}
                  </p>
                  <p className="text-primary text-sm mt-1">
                    Experience: {tutor.experience} yrs
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
