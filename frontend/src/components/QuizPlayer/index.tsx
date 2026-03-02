'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizPlayerProps {
  username: string;
  topic: string;
  level: string;
  onComplete: (quizId: string, answers: Record<number, string>, timeTaken: number) => void;
  onClose: () => void;
}

export default function QuizPlayer({ username, topic, level, onComplete, onClose }: QuizPlayerProps) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [loading, setLoading] = useState(true);
  const [quizId, setQuizId] = useState('');
  const [startTime] = useState(Date.now());

  useEffect(() => {
    generateQuiz();
  }, []);

  useEffect(() => {
    if (loading || questions.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, questions]);

  const generateQuiz = async () => {
    try {
      console.log('Generating quiz for:', { username, topic, level });
      
      const response = await fetch('http://localhost:8000/api/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          topic,
          level,
          num_questions: 5
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Quiz response:', data);
      
      // Check for quiz_session_id in the response
      if (!data.quiz_session_id && !data.id) {
        console.error('No quiz ID in response:', data);
        throw new Error('Quiz ID missing from response');
      }
      
      setQuestions(data.questions || []);
      // Try both possible field names
      setQuizId(data.quiz_session_id || data.id);
      setLoading(false);
    } catch (error) {
      console.error('Error generating quiz:', error);
      alert('Failed to generate quiz. Please make sure the backend is running.');
      onClose();
    }
  };

  const handleAnswerSelect = (answer: string) => {
    setAnswers({
      ...answers,
      [currentQuestion]: answer
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    console.log('Submitting with quiz ID:', quizId);
    onComplete(quizId, answers, timeTaken);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8">
          <div className="text-xl font-semibold text-gray-700">🧠 Generating your quiz...</div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 text-center">
          <div className="text-xl font-semibold text-gray-700 mb-4">❌ Failed to load quiz</div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold capitalize">📝 {topic} Quiz</h2>
              <p className="text-green-100 text-sm">Question {currentQuestion + 1} of {questions.length}</p>
            </div>
            <div className="text-right">
              <div className={`text-3xl font-bold ${timeLeft < 60 ? 'text-red-200' : ''}`}>
                ⏱️ {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-green-100">Time Remaining</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-green-700 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          
          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <div className="flex items-start gap-3 mb-6">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold">
                    {currentQuestion + 1}
                  </span>
                  <p className="text-xl font-semibold text-gray-800 leading-relaxed">
                    {currentQ.question_text}
                  </p>
                </div>

                {/* Difficulty Badge */}
                <div className="mb-6">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    currentQ.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                    currentQ.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {currentQ.difficulty}
                  </span>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {Object.entries(currentQ.options).map(([key, value]: [string, any]) => (
                    <button
                      key={key}
                      onClick={() => handleAnswerSelect(key)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        answers[currentQuestion] === key
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          answers[currentQuestion] === key
                            ? 'border-green-500 bg-green-500'
                            : 'border-gray-300'
                        }`}>
                          {answers[currentQuestion] === key && (
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="font-semibold text-green-700 mr-2">{key}.</span>
                        <span className="text-gray-700">{value}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t-2 border-gray-100">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            <div className="text-sm text-gray-500">
              {Object.keys(answers).length} of {questions.length} answered
            </div>

            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={Object.keys(answers).length < questions.length}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Quiz ✓
              </button>
            )}
          </div>

          {/* Answer Status */}
          <div className="mt-6 flex justify-center gap-2">
            {questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestion(idx)}
                className={`w-8 h-8 rounded-full font-semibold text-sm transition ${
                  idx === currentQuestion
                    ? 'bg-green-600 text-white ring-2 ring-green-300'
                    : answers[idx]
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}