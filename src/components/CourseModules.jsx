import React from "react";

const CourseModules = ({ modules }) => {
  if (!modules || !Array.isArray(modules) || modules.length === 0) {
    return (
      <div className="p-4 bg-gray-100 rounded-xl shadow-sm">
        <p className="text-gray-500 italic">No modules available.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-indigo-600">Course Modules</h2>
      <ul className="space-y-4">
        {modules.map((mod, index) => (
          <li
            key={index}
            className="p-3 border border-gray-200 rounded-lg hover:bg-indigo-50 transition"
          >
            <h3 className="font-bold text-gray-800">
              {mod?.title || `Module ${index + 1}`}
            </h3>
            {mod?.topics && Array.isArray(mod.topics) ? (
              <ul className="list-disc list-inside mt-2 text-gray-700">
                {mod.topics.map((topic, tIndex) => (
                  <li key={tIndex}>{topic || "Untitled Topic"}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm mt-1">No topics available.</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseModules;
