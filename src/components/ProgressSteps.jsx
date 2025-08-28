const ProgressSteps = ({ step }) => (
  <div className="flex justify-center mb-12">
    <div className="flex items-center">
      {[1, 2, 3].map((num, idx) => (
        <div key={num} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
              step >= num ? "bg-purple-600 text-white" : "bg-gray-300 text-gray-600"
            }`}
          >
            {num}
          </div>
          {idx < 2 && (
            <div
              className={`h-1 w-16 ${step > num ? "bg-purple-600" : "bg-gray-300"}`}
            ></div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default ProgressSteps;
