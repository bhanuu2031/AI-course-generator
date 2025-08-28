import React from "react";

const pretty = (s) => (typeof s === "string" ? s.charAt(0).toUpperCase() + s.slice(1) : s);

const CourseOverview = ({ course, meta }) => {
  const level = meta?.level ? pretty(meta.level) : null;
  const duration = meta?.duration ? `${meta.duration} weeks` : null;
  const style = meta?.style ? pretty(meta.style) : null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Course Overview</h3>

      {/* Badges */}
      <div className="flex flex-wrap gap-3 mb-6">
        {level && (
          <span className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-200">
            Level: {level}
          </span>
        )}
        {duration && (
          <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-200">
            Duration: {duration}
          </span>
        )}
        {style && (
          <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200">
            Style: {style}
          </span>
        )}
      </div>

      {/* Overview text (from model) */}
      {course?.overview && (
        <p className="text-gray-700 dark:text-gray-200">{course.overview}</p>
      )}
    </div>
  );
};

export default CourseOverview;
