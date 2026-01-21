import React from 'react';

const QuestionCard = ({ question, selectedOption, onOptionSelect }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 max-w-2xl mx-auto mt-8">
      <div className="mb-4">
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
          {question.category || 'General'}
        </span>
      </div>
      
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        {question.question}
      </h2>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onOptionSelect(question._id, index)}
            className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
              selectedOption === index
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-blue-50 hover:border-blue-300'
            }`}
          >
            <span className="font-semibold mr-2">{index + 1}.</span> {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;