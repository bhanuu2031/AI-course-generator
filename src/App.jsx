import React, { useState } from "react";
import Header from "./components/Header";
import ProgressSteps from "./components/ProgressSteps";
import FeaturesPreview from "./components/FeaturesPreview";
import CourseForm from "./components/CourseForm";
import LoadingScreen from "./components/LoadingScreen";
import Result from "./pages/Result";
import Chatbot from "./components/Chatbot";

// Use env if provided, fallback to localhost
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    topic: "",
    level: "beginner",
    duration: "4",
    learningObjectives: "",
    preferredStyle: "interactive",
    targetAudience: "",
  });
  const [generatedCourse, setGeneratedCourse] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.topic.trim()) {
      setError("Please enter a course topic");
      return;
    }

    setError("");
    setStep(2); // show loading

    try {
      const response = await fetch(`${API_BASE}/api/generate-course`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to generate course");

      const data = await response.json();
      setGeneratedCourse(data.course);
      setStep(3);
    } catch (err) {
      console.error(err);
      setError("Failed to generate course. Please try again.");
      setStep(1);
    }
  };

  const resetGenerator = () => {
    setStep(1);
    setFormData({
      topic: "",
      level: "beginner",
      duration: "4",
      learningObjectives: "",
      preferredStyle: "interactive",
      targetAudience: "",
    });
    setGeneratedCourse(null);
    setError("");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl relative">
      {/* Header and Steps */}
      <Header />
      <ProgressSteps step={step} />

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Step 1: Form + Features */}
      {step === 1 && (
        <>
          <CourseForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
          <FeaturesPreview />
        </>
      )}

      {/* Step 2: Loading */}
      {step === 2 && <LoadingScreen />}

      {/* Step 3: Result */}
      {step === 3 && generatedCourse && (
      <Result
      course={generatedCourse}
      resetGenerator={resetGenerator}
      meta={{
       level: formData.level,      // "beginner" | "intermediate" | "advanced"
       duration: formData.duration,      // e.g. "4"
       style: formData.preferredStyle,       // "interactive" etc.
      }}
     />
    )}



      {/* Floating Chatbot (global) */}
      <div className="fixed bottom-6 right-6 w-80 z-50">
        <Chatbot
          collapsible
          title="Helper AI"
          defaultOpen={false}
          meta={{
            level: formData.level,
            duration: formData.duration,
            style: formData.preferredStyle,
          }}
        />
      </div>
    </div>
  );
}
