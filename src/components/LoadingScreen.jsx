import React from "react";

const LoadingScreen = () => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-6"></div>
    <p className="text-xl font-medium text-gray-700">
      Generating your personalized course...
    </p>
  </div>
);

export default LoadingScreen;
