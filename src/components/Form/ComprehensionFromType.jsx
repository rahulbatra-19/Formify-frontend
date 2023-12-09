import React, { useEffect, useState } from "react";

export default function ComprehensionFromType({
  question,
  index,
  points,
  setPoints,
}) {
  const { ComprehensionSubQuestions } = question;
  const [subQuesAns, setSubQuesAns] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const pointForEachQuestion = question.points / subQuesAns.length;
  useEffect(() => {
    let ans = [];
    for (let subq of ComprehensionSubQuestions) {
      const { answer } = subq;
      ans.push(answer);
    }
    setSubQuesAns(ans);
  }, []);
  useEffect(() => {
    let point = 0;
    for (let i = 0; i < subQuesAns.length; i++) {
      if (subQuesAns[i] === selectedOptions[i]) {
        point += pointForEachQuestion;
      }
    }
    const newPoints = [...points];
    newPoints[index] = point;
    setPoints(newPoints);
  }, [selectedOptions]);
  return (
    <div className="bg-white w-3/4 p-5 rounded-xl shadow-lg font-sans">
      <p className="text-xl text-gray-600 mb-3 border-b-2">
        Question {index + 1}
      </p>
      <p className="text-xl font-medium">{question.question}</p>
      <div className="flex justify-end items-center">
        <div className="text-gray-500">
          Points
          <p className="border-2 py-2 px-6  rounded-lg mr-40 text-gray-500">
            {question.points}
          </p>
        </div>
      </div>
      {question.image !== "" && (
        <img src={question.image} className="w-80 h-80 mx-4 mb-4 shadow-md" />
      )}
      <div className="p-7 border-t-2">
        {ComprehensionSubQuestions.map((mcq, mcqIndex) => (
          <div
            key={`mcqindex-${mcqIndex}`}
            className="shadow-xl border-2 mb-8 rounded-xl p-5 "
          >
            <span className="text-gray-600">
              Question {index + 1}.{mcqIndex + 1}
            </span>
            <p>{mcq.question}</p>
            {mcq.options.map((option, index) => (
              <div className="mt-3" key={option}>
                <input
                  type="radio"
                  name={`option-${mcqIndex}`}
                  id={`option-id-${mcqIndex}-${index}`}
                  className="mr-4"
                  value={option}
                  onChange={(e) => {
                    const options = [...selectedOptions];
                    options[mcqIndex] = e.target.value;
                    setSelectedOptions(options);
                  }}
                />
                <label htmlFor={`option-id-${mcqIndex}-${index}`}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
