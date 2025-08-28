const features = [
  {
    title: "AI-Powered",
    desc: "Our advanced AI creates personalized learning paths based on your goals and preferences.",
    color: "blue",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
    ),
  },
  {
    title: "Comprehensive",
    desc: "Complete courses with modules, lessons, resources, and assessments ready to use.",
    color: "green",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    ),
  },
  {
    title: "Customizable",
    desc: "Adjust difficulty, duration, and learning style to match your exact requirements.",
    color: "purple",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
    ),
  },
];

const FeaturesPreview = () => (
  <div className="grid md:grid-cols-3 gap-6 mt-12">
    {features.map((f, i) => (
      <div
        key={i}
        className="bg-white p-6 rounded-xl shadow-lg text-center card-hover"
      >
        <div
          className={`w-12 h-12 bg-${f.color}-100 rounded-lg flex items-center justify-center mx-auto mb-4`}
        >
          <svg
            className={`w-6 h-6 text-${f.color}-600`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {f.icon}
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
        <p className="text-gray-600">{f.desc}</p>
      </div>
    ))}
  </div>
);

export default FeaturesPreview;
