'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnalyticsDashboardProps {
  username: string;
  onClose: () => void;
}

export default function AnalyticsDashboard({ username, onClose }: AnalyticsDashboardProps) {
  const [quizHistory, setQuizHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    totalTopics: 0,
    bestScore: 0,
    improvementRate: 0
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch quiz history
      const response = await fetch(`http://localhost:8000/api/quiz/${username}/history`);
      const data = await response.json();
      
      if (data.quizzes && data.quizzes.length > 0) {
        const quizzes = data.quizzes;
        setQuizHistory(quizzes);
        
        // Calculate stats
        const totalQuizzes = quizzes.length;
        const avgScore = quizzes.reduce((sum: number, q: any) => sum + q.score, 0) / totalQuizzes;
        const uniqueTopics = new Set(quizzes.map((q: any) => q.topic)).size;
        const bestScore = Math.max(...quizzes.map((q: any) => q.score));
        
        // Calculate improvement (compare first 3 vs last 3 quizzes)
        let improvement = 0;
        if (totalQuizzes >= 6) {
          const firstThree = quizzes.slice(0, 3).reduce((sum: number, q: any) => sum + q.score, 0) / 3;
          const lastThree = quizzes.slice(-3).reduce((sum: number, q: any) => sum + q.score, 0) / 3;
          improvement = ((lastThree - firstThree) / firstThree) * 100;
        }
        
        setStats({
          totalQuizzes,
          averageScore: Math.round(avgScore),
          totalTopics: uniqueTopics,
          bestScore: Math.round(bestScore),
          improvementRate: Math.round(improvement)
        });
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
    }
  };

  // Prepare chart data
  const scoreOverTimeData = quizHistory.map((quiz, index) => ({
    quiz: `Quiz ${index + 1}`,
    score: Math.round(quiz.score),
    topic: quiz.topic
  }));

  // Topic performance data
  const topicPerformance = quizHistory.reduce((acc: any, quiz) => {
    if (!acc[quiz.topic]) {
      acc[quiz.topic] = { topic: quiz.topic, totalScore: 0, count: 0 };
    }
    acc[quiz.topic].totalScore += quiz.score;
    acc[quiz.topic].count += 1;
    return acc;
  }, {});

  const topicData = Object.values(topicPerformance).map((item: any) => ({
    topic: item.topic,
    avgScore: Math.round(item.totalScore / item.count)
  }));

  // Difficulty performance data
  const difficultyData = quizHistory.length > 0 ? [
    {
      difficulty: 'Easy',
      score: Math.round(quizHistory.reduce((sum, q) => {
        const easyCorrect = q.questions?.filter((qu: any) => qu.difficulty === 'easy' && qu.is_correct).length || 0;
        const easyTotal = q.questions?.filter((qu: any) => qu.difficulty === 'easy').length || 1;
        return sum + (easyCorrect / easyTotal) * 100;
      }, 0) / quizHistory.length)
    },
    {
      difficulty: 'Medium',
      score: Math.round(quizHistory.reduce((sum, q) => {
        const medCorrect = q.questions?.filter((qu: any) => qu.difficulty === 'medium' && qu.is_correct).length || 0;
        const medTotal = q.questions?.filter((qu: any) => qu.difficulty === 'medium').length || 1;
        return sum + (medCorrect / medTotal) * 100;
      }, 0) / quizHistory.length)
    },
    {
      difficulty: 'Hard',
      score: Math.round(quizHistory.reduce((sum, q) => {
        const hardCorrect = q.questions?.filter((qu: any) => qu.difficulty === 'hard' && qu.is_correct).length || 0;
        const hardTotal = q.questions?.filter((qu: any) => qu.difficulty === 'hard').length || 1;
        return sum + (hardCorrect / hardTotal) * 100;
      }, 0) / quizHistory.length)
    }
  ] : [];

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8">
          <div className="text-xl">⏳ Loading analytics...</div>
        </div>
      </div>
    );
  }

  if (quizHistory.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
          <div className="text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Data Yet</h3>
            <p className="text-gray-600 mb-6">
              Take some quizzes to see your analytics and progress!
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">📊 Learning Analytics</h2>
              <p className="text-indigo-100">Track your progress and performance</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">{stats.totalQuizzes}</div>
              <div className="text-sm text-blue-700 font-medium mt-1">Total Quizzes</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-600">{stats.averageScore}%</div>
              <div className="text-sm text-green-700 font-medium mt-1">Avg Score</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-purple-600">{stats.totalTopics}</div>
              <div className="text-sm text-purple-700 font-medium mt-1">Topics</div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-orange-600">{stats.bestScore}%</div>
              <div className="text-sm text-orange-700 font-medium mt-1">Best Score</div>
            </div>
            
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-pink-600">
                {stats.improvementRate > 0 ? '+' : ''}{stats.improvementRate}%
              </div>
              <div className="text-sm text-pink-700 font-medium mt-1">Improvement</div>
            </div>
          </div>

          {/* Score Over Time Chart */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📈 Score Progression</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={scoreOverTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quiz" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} name="Score %" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Topic Performance Chart */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📚 Performance by Topic</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topicData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="topic" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="avgScore" fill="#10b981" name="Avg Score %" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Difficulty Performance Chart */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🎯 Performance by Difficulty</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={difficultyData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="difficulty" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar name="Score %" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Quizzes Table */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 mt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📋 Recent Quizzes</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-700 font-semibold">Topic</th>
                    <th className="text-center py-3 px-4 text-gray-700 font-semibold">Score</th>
                    <th className="text-center py-3 px-4 text-gray-700 font-semibold">Questions</th>
                    <th className="text-center py-3 px-4 text-gray-700 font-semibold">Time</th>
                    <th className="text-left py-3 px-4 text-gray-700 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {quizHistory.slice(0, 10).map((quiz, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 capitalize font-medium text-gray-800">{quiz.topic}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full font-bold ${
                          quiz.score >= 80 ? 'bg-green-100 text-green-700' :
                          quiz.score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {Math.round(quiz.score)}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-gray-600">
                        {quiz.correct_answers}/{quiz.total_questions}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-600">
                        {Math.floor(quiz.time_taken / 60)}:{(quiz.time_taken % 60).toString().padStart(2, '0')}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(quiz.completed_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Insights */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">💡 Insights & Recommendations</h3>
            <div className="space-y-2 text-gray-700">
              {stats.averageScore >= 80 && (
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Excellent performance! You're mastering the topics well.</span>
                </div>
              )}
              {stats.averageScore < 60 && (
                <div className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">→</span>
                  <span>Consider reviewing the explanations before taking quizzes.</span>
                </div>
              )}
              {stats.improvementRate > 10 && (
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">↑</span>
                  <span>Great progress! Your scores are improving consistently.</span>
                </div>
              )}
              {stats.totalQuizzes < 5 && (
                <div className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">→</span>
                  <span>Take more quizzes to get better insights into your learning patterns.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}