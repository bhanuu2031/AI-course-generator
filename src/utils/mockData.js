export const mockGenerateCourse = (formData) => {
  return {
    title: `${formData.topic} - ${formData.level} Level`,
    description: `A ${formData.duration}-week comprehensive course on ${formData.topic}, designed for ${formData.targetAudience || "learners"} with a ${formData.preferredStyle} approach.`,
    level: formData.level,
    duration: formData.duration,
    preferredStyle: formData.preferredStyle,
    modules: [
      {
        week: 1,
        title: "Introduction & Fundamentals",
        description: `Understand the basics of ${formData.topic} and set up the environment.`,
      },
      {
        week: 2,
        title: "Core Concepts",
        description: `Dive into the main concepts of ${formData.topic}.`,
      },
      {
        week: 3,
        title: "Hands-on Projects",
        description: `Apply your knowledge through projects.`,
      },
      {
        week: 4,
        title: "Final Assessment",
        description: `Test your skills with quizzes and a capstone project.`,
      },
    ],
    resources: [
      "Official Documentation",
      "YouTube Tutorials",
      "FreeCodeCamp Articles",
      "Recommended Textbooks",
    ],
  };
};
