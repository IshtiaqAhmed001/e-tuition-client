import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-primary font-semibold text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
