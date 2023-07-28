
import React, { useState, useEffect } from "react";
import axios from "axios";
import Question from "./Question";
import "../Components/quiz.css"

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    try {
      const response = await axios.get(
        "https://opentdb.com/api.php?amount=5&type=multiple"
      );
      const quizData = response.data.results.map((questionData) => ({
        question: questionData.question,
        options: [
          ...questionData.incorrect_answers,
          questionData.correct_answer,
        ],
        correctAnswer: questionData.incorrect_answers.length,
    
      }));
      setQuestions(quizData);

      console.log("Fetched Quiz Data:", quizData);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  const handleAnswerSelect = (selectedAnswerIndex) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.correctAnswer === selectedAnswerIndex) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsQuizFinished(false);
  };

  return (
    <div className="quiz-container">
      {isQuizFinished ? (
        <div>
          <h2>Quiz Finished!</h2>
          <p>Your score: {score}</p>
          <button onClick={handleRestartQuiz}>Restart Quiz</button>
        </div>
      ) : questions.length === 0 ? (
        <p>Loading quiz data...</p>
      ) : (
        <Question
          question={questions[currentQuestionIndex].question}
          options={questions[currentQuestionIndex].options}
          onAnswerSelect={handleAnswerSelect}
        />
      )}

    </div>
  );
};

export default Quiz;
