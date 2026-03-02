'use client';

import { motion } from 'framer-motion';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number;
  questions: any[];
  userAnswers: Record<number, string>;
  onClose: () => void;
  onRetake: () => void;
}
  
export default function QuizResults({
  score,
  totalQuestions,
  correctAnswers,
  timeTaken,
  questions,
  userAnswers,
  onClose,
  onRetake
}: QuizResultsProps) {
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreMessage = () => {
    if (score >= 90) return { emoji: '🏆', text: 'Outstanding!', color: 'text-yellow-600' };
    if (score >= 80) return { emoji: '🎉', text: 'Excellent!', color: 'text-green-600' };
    if (score >= 70) return { emoji: '👏', text: 'Great Job!', color: 'text-blue-600' };
    if (score >= 60) return { emoji: '👍', text: 'Good Effort!', color: 'text-indigo-600' };
    return { emoji: '💪', text: 'Keep Practicing!', color: 'text-orange-600' };
  };

  const scoreMessage = getScoreMessage();

  const performanceByDifficulty = {
    easy: { correct: 0, total: 0 },
    medium: { correct: 0, total: 0 },
    hard: { correct: 0, total: 0 }
  };

  questions.forEach((q, idx) => {
    const difficulty = q.difficulty as 'easy' | 'medium' | 'hard';
    performanceByDifficulty[difficulty].total++;
    if (userAnswers[idx] === q.correct_answer) {
      performanceByDifficulty[difficulty].correct++;
    }
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8"
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-t-2xl text-center">
          <div className="text-6xl mb-3">{scoreMessage.emoji}</div>
          <h2 className="text-3xl font-bold mb-2">{scoreMessage.text}</h2>
          <p className="text-indigo-100">Quiz Complete!</p>
        </div>

        {/* Score Display */}
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-block">
              <div className="relative w-48 h-48 mx-auto mb-4">
                <svg className="transform -rotate-90 w-48 h-48">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke={score >= 70 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${(score / 100) * 553} 553`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div>
                    <div className={`text-5xl font-bold ${scoreMessage.color}`}>
                      {Math.round(score)}%
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Your Score</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-600">{correctAnswers}</div>
              <div className="text-sm text-green-700 font-medium mt-1">Correct</div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-red-600">{totalQuestions - correctAnswers}</div>
              <div className="text-sm text-red-700 font-medium mt-1">Incorrect</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">{formatTime(timeTaken)}</div>
              <div className="text-sm text-blue-700 font-medium mt-1">Time Taken</div>
            </div>
          </div>

          {/* Performance by Difficulty */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-gray-800 mb-4">📊 Performance by Difficulty</h3>
            <div className="space-y-3">
              {Object.entries(performanceByDifficulty).map(([difficulty, stats]) => (
                <div key={difficulty}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold capitalize text-gray-700">{difficulty}</span>
                    <span className="text-sm text-gray-600">
                      {stats.correct}/{stats.total} correct
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        difficulty === 'easy' ? 'bg-green-500' :
                        difficulty === 'medium' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${stats.total > 0 ? (stats.correct / stats.total) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Question Review */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-800 mb-4">📝 Question Review</h3>
            <div className="space-y-4">
              {questions.map((q, idx) => {
                const userAnswer = userAnswers[idx];
                const isCorrect = userAnswer === q.correct_answer;

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border-2 ${
                      isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                        isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {isCorrect ? '✓' : '✗'}
                      </span>
                      <p className="text-gray-800 font-medium">{q.question_text}</p>
                    </div>

                    <div className="ml-9 space-y-2">
                      {!isCorrect && userAnswer && (
                        <div className="text-sm">
                          <span className="text-red-700 font-semibold">Your answer: </span>
                          <span className="text-red-600">{userAnswer}. {q.options[userAnswer]}</span>
                        </div>
                      )}
                      <div className="text-sm">
                        <span className="text-green-700 font-semibold">Correct answer: </span>
                        <span className="text-green-600">{q.correct_answer}. {q.options[q.correct_answer]}</span>
                      </div>
                      {q.explanation && (
                        <div className="text-sm bg-white p-3 rounded-lg mt-2">
                          <span className="text-gray-700 font-semibold">💡 Explanation: </span>
                          <span className="text-gray-600">{q.explanation}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={onRetake}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-bold hover:shadow-lg transition"
            >
              🔄 Retake Quiz
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition"
            >
              ✓ Done
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}