

import React, { useState } from "react";

const Question = ({ question, options, onAnswerSelect }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerChange = (event) => {
    setSelectedAnswer(Number(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAnswerSelect(selectedAnswer);
    setSelectedAnswer(null);
  };

  return (
    <div>
      <h2>{question}</h2>
      <form onSubmit={handleSubmit}>
        {options.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              name="answer"
              value={index}
              checked={selectedAnswer === index}
              onChange={handleAnswerChange}
            />
            {option}
          </label>
        ))}
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default Question;
