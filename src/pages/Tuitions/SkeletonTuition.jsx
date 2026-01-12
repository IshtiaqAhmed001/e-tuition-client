import React from "react";

const SkeletonTuition = () => {
  return (
    <div className="rounded-xl bg-neutral p-6 shadow-md border border-accent animate-pulse">
      <div className="h-6 bg-primary mb-2 w-3/4 rounded"></div>
      <div className="h-4 bg-base-300 mb-2 w-1/2 rounded"></div>
      <div className="h-4 bg-base-300 mb-1 w-2/3 rounded"></div>
      <div className="h-4 bg-base-300 mb-1 w-1/3 rounded"></div>
      <div className="h-6 bg-primary mt-4 w-1/4 rounded"></div>
      <div className="flex justify-between mt-6">
        <div className="h-6 w-24 bg-primary rounded-full"></div>
        <div className="h-6 w-20 bg-primary rounded-full"></div>
      </div>
    </div>
  );
};

export default SkeletonTuition;
