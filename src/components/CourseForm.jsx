import React from "react";

const CourseForm = ({ formData, handleInputChange, handleSubmit }) => (
  <form
    onSubmit={handleSubmit}
    className="bg-white p-8 rounded-xl shadow-lg mb-12 card-hover"
  >
    <div className="grid md:grid-cols-2 gap-6">
      {/* Course Topic */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Course Topic *
        </label>
        <input
          type="text"
          name="topic"
          value={formData.topic}
          onChange={handleInputChange}
          placeholder="e.g., Machine Learning Basics"
          className="w-full p-3 border rounded-lg input-focus"
          required
        />
      </div>

      {/* Level */}
      <div>
        <label className="block text-sm font-medium mb-2">Difficulty Level</label>
        <select
          name="level"
          value={formData.level}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg input-focus"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {/* Duration */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Duration (weeks)
        </label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleInputChange}
          min="1"
          max="52"
          className="w-full p-3 border rounded-lg input-focus"
        />
      </div>

      {/* Learning Objectives */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Learning Objectives
        </label>
        <textarea
          name="learningObjectives"
          value={formData.learningObjectives}
          onChange={handleInputChange}
          placeholder="e.g., Understand basics of ML, implement models..."
          className="w-full p-3 border rounded-lg input-focus h-24"
        />
      </div>

      {/* Preferred Style */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Preferred Learning Style
        </label>
        <select
          name="preferredStyle"
          value={formData.preferredStyle}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg input-focus"
        >
          <option value="interactive">Interactive</option>
          <option value="self-paced">Self-paced</option>
          <option value="project-based">Project-based</option>
          <option value="theory-focused">Theory-focused</option>
        </select>
      </div>

      {/* Target Audience */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Target Audience
        </label>
        <input
          type="text"
          name="targetAudience"
          value={formData.targetAudience}
          onChange={handleInputChange}
          placeholder="e.g., College students, professionals"
          className="w-full p-3 border rounded-lg input-focus"
        />
      </div>
    </div>

    <div className="mt-8 text-center">
      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
      >
        Generate Course
      </button>
    </div>
  </form>
);

export default CourseForm;
