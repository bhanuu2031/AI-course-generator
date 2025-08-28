import React from "react";

const ActionButtons = ({ resetGenerator }) => (
  <div className="flex gap-4 justify-center">
    <button
      onClick={resetGenerator}
      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium"
    >
      Generate New Course
    </button>
    <button
      onClick={() => alert("Download feature coming soon!")}
      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium"
    >
      Download PDF
    </button>
  </div>
);

export default ActionButtons;
