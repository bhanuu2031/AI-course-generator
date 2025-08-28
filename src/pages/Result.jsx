import React from "react";
import CourseOverview from "../components/CourseOverview";
import CourseModules from "../components/CourseModules";
import CourseResources from "../components/CourseResources";
import ActionButtons from "../components/ActionButtons";
import Chatbot from "../components/Chatbot";

const Result = ({ course, resetGenerator, meta }) => {
  return (
    <div className="space-y-8 p-6">
      <CourseOverview course={course} meta={meta} />
      <CourseModules modules={course.modules} />
      <CourseResources resources={course.resources} />
      <ActionButtons resetGenerator={resetGenerator} />

      {/* Optional embedded chatbot with the same meta */}
      <div className="mt-10 bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Ask Doubts to AI Tutor
        </h2>
        <Chatbot meta={meta} />
      </div>
    </div>
  );
};

export default Result;
