'use client';

import { useState, useEffect } from 'react';
import {
  LineChart, Line,
  BarChart, Bar,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const API_URL = 'https://genai-tutor-production.up.railway.app';

interface AnalyticsDashboardProps {
  username: string;
  onClose: () => void;
}

// ── Custom radar label — renders cleanly on all screen sizes ──────────────
const RadarAngleLabel = ({ x, y, cx, cy, payload }: any) => {
  const dx = x - cx;
  const dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const nx = cx + (dx / dist) * (dist + 22);
  const ny = cy + (dy / dist) * (dist + 22);
  return (
    <text
      x={nx}
      y={ny}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fill="#4b5563"
      fontWeight={500}
    >
      {payload.value}
    </text>
  );
};

export default function AnalyticsDashboard({ username, onClose }: AnalyticsDashboardProps) {
  const [quizHistory, setQuizHistory] = useState<any[]>([]);
  const [loading, setLoading]         = useState(true);
  const [stats, setStats] = useState({
    totalQuizzes:    0,
    averageScore:    0,
    totalTopics:     0,
    bestScore:       0,
    improvementRate: 0,
  });

  useEffect(() => { fetchAnalytics(); }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`${API_URL}/api/quiz/${username}/history`);
      const data     = await response.json();

      if (data.quizzes && data.quizzes.length > 0) {
        const quizzes     = data.quizzes;
        const totalQuizzes = quizzes.length;
        const avgScore     = quizzes.reduce((s: number, q: any) => s + q.score, 0) / totalQuizzes;
        const uniqueTopics = new Set(quizzes.map((q: any) => q.topic)).size;
        const bestScore    = Math.max(...quizzes.map((q: any) => q.score));

        let improvement = 0;
        if (totalQuizzes >= 6) {
          const first3 = quizzes.slice(0, 3).reduce((s: number, q: any) => s + q.score, 0) / 3;
          const last3  = quizzes.slice(-3).reduce((s: number, q: any) => s + q.score, 0) / 3;
          improvement  = ((last3 - first3) / first3) * 100;
        }

        setQuizHistory(quizzes);
        setStats({
          totalQuizzes,
          averageScore:    Math.round(avgScore),
          totalTopics:     uniqueTopics,
          bestScore:       Math.round(bestScore),
          improvementRate: Math.round(improvement),
        });
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  // ── Chart data ────────────────────────────────────────────────────────
  const scoreOverTimeData = quizHistory.map((quiz, i) => ({
    quiz:  `Q${i + 1}`,           // short label so X axis never crowds
    score: Math.round(quiz.score),
    topic: quiz.topic,
  }));

  const topicPerformance = quizHistory.reduce((acc: any, quiz) => {
    if (!acc[quiz.topic]) acc[quiz.topic] = { topic: quiz.topic, totalScore: 0, count: 0 };
    acc[quiz.topic].totalScore += quiz.score;
    acc[quiz.topic].count      += 1;
    return acc;
  }, {});

  const topicData = Object.values(topicPerformance).map((item: any) => ({
    topic:    item.topic,
    avgScore: Math.round(item.totalScore / item.count),
  }));

  const difficultyData = quizHistory.length > 0 ? ['easy', 'medium', 'hard'].map((level) => {
    const avg = Math.round(
      quizHistory.reduce((sum, q) => {
        const correct = q.questions?.filter((qu: any) => qu.difficulty === level && qu.is_correct).length || 0;
        const total   = q.questions?.filter((qu: any) => qu.difficulty === level).length || 1;
        return sum + (correct / total) * 100;
      }, 0) / quizHistory.length
    );
    return { difficulty: level.charAt(0).toUpperCase() + level.slice(1), score: avg };
  }) : [];

  // ── Loading ───────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 text-xl">⏳ Loading analytics...</div>
      </div>
    );
  }

  // ── Empty state ───────────────────────────────────────────────────────
  if (quizHistory.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No Data Yet</h3>
          <p className="text-gray-600 mb-6">Take some quizzes to see your analytics and progress!</p>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // ── Main dashboard ────────────────────────────────────────────────────
  return (
    /* Outer overlay — scrollable so nothing ever clips off-screen */
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      {/* Centre wrapper with safe padding so modal never touches edges */}
      <div className="min-h-full flex items-start justify-center p-3 sm:p-6">

        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl my-4 sm:my-8 overflow-hidden">

          {/* ── Header ─────────────────────────────────────────────── */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 sm:p-6">
            <div className="flex items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-3xl font-bold mb-1">📊 Learning Analytics</h2>
                <p className="text-indigo-100 text-sm sm:text-base">Track your progress and performance</p>
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 text-white hover:bg-white/20 rounded-full p-2 transition"
                aria-label="Close"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── Body ───────────────────────────────────────────────── */}
          <div className="p-3 sm:p-6 lg:p-8 space-y-5 sm:space-y-6">

            {/* Stats cards — 2 cols on mobile, 5 on desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">{stats.totalQuizzes}</div>
                <div className="text-xs sm:text-sm text-blue-700 font-medium mt-1">Total Quizzes</div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-600">{stats.averageScore}%</div>
                <div className="text-xs sm:text-sm text-green-700 font-medium mt-1">Avg Score</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600">{stats.totalTopics}</div>
                <div className="text-xs sm:text-sm text-purple-700 font-medium mt-1">Topics</div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-orange-600">{stats.bestScore}%</div>
                <div className="text-xs sm:text-sm text-orange-700 font-medium mt-1">Best Score</div>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-pink-600">
                  {stats.improvementRate > 0 ? '+' : ''}{stats.improvementRate}%
                </div>
                <div className="text-xs sm:text-sm text-pink-700 font-medium mt-1">Improvement</div>
              </div>
            </div>

            {/* Score over time */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">📈 Score Progression</h3>
              {/* Height shrinks gracefully on small screens */}
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={scoreOverTimeData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quiz" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} width={40} />
                  <Tooltip
                    formatter={(v: any) => [`${v}%`, 'Score']}
                    labelFormatter={(l) => `${l}`}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    name="Score %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Topic + Difficulty — stack on mobile, side-by-side on md+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Bar chart — topic */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                  📚 Performance by Topic
                </h3>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={topicData} margin={{ top: 5, right: 10, left: -20, bottom: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="topic"
                      tick={{ fontSize: 11 }}
                      angle={-25}
                      textAnchor="end"
                      interval={0}
                    />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} width={40} />
                    <Tooltip formatter={(v: any) => [`${v}%`, 'Avg Score']} />
                    <Bar dataKey="avgScore" fill="#10b981" name="Avg Score %" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Radar chart — difficulty
                  Key fixes:
                  • outerRadius="60%"  → always fits inside its container
                  • cx/cy centred       → labels are never cut off
                  • Custom angle label  → pushes text outside the ring
                  • PolarRadiusAxis tick fontSize
              */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                  🎯 Performance by Difficulty
                </h3>
                <ResponsiveContainer width="100%" height={260}>
                  <RadarChart
                    data={difficultyData}
                    cx="50%"
                    cy="50%"
                    outerRadius="60%"
                    margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
                  >
                    <PolarGrid />
                    <PolarAngleAxis
                      dataKey="difficulty"
                      tick={<RadarAngleLabel />}
                    />
                    <PolarRadiusAxis
                      domain={[0, 100]}
                      tickCount={5}
                      tick={{ fontSize: 10, fill: '#9ca3af' }}
                      axisLine={false}
                    />
                    <Radar
                      name="Score %"
                      dataKey="score"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.55}
                    />
                    <Tooltip formatter={(v: any) => [`${v}%`, 'Score']} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Quizzes table — horizontally scrollable on small screens */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">📋 Recent Quizzes</h3>
              <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
                <table className="w-full min-w-[480px]">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      {['Topic', 'Score', 'Questions', 'Time', 'Date'].map((h) => (
                        <th
                          key={h}
                          className={`py-2 sm:py-3 px-2 sm:px-4 text-gray-700 font-semibold text-sm
                            ${h === 'Topic' ? 'text-left' : 'text-center'}`}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {quizHistory.slice(0, 10).map((quiz, i) => (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-2 sm:py-3 px-2 sm:px-4 capitalize font-medium text-gray-800 text-sm">
                          {quiz.topic}
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
                          <span className={`inline-block px-2 sm:px-3 py-1 rounded-full font-bold text-xs sm:text-sm ${
                            quiz.score >= 80 ? 'bg-green-100 text-green-700' :
                            quiz.score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                                              'bg-red-100 text-red-700'
                          }`}>
                            {Math.round(quiz.score)}%
                          </span>
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-center text-gray-600 text-sm">
                          {quiz.correct_answers}/{quiz.total_questions}
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-center text-gray-600 text-sm">
                          {Math.floor(quiz.time_taken / 60)}:{(quiz.time_taken % 60).toString().padStart(2, '0')}
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-600 text-sm">
                          {new Date(quiz.completed_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Insights */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">💡 Insights & Recommendations</h3>
              <div className="space-y-2 text-sm sm:text-base text-gray-700">
                {stats.averageScore >= 80 && (
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                    <span>Excellent performance! You're mastering the topics well.</span>
                  </div>
                )}
                {stats.averageScore < 60 && (
                  <div className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold flex-shrink-0">→</span>
                    <span>Consider reviewing the explanations before taking quizzes.</span>
                  </div>
                )}
                {stats.improvementRate > 10 && (
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold flex-shrink-0">↑</span>
                    <span>Great progress! Your scores are improving consistently.</span>
                  </div>
                )}
                {stats.totalQuizzes < 5 && (
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold flex-shrink-0">→</span>
                    <span>Take more quizzes to get better insights into your learning patterns.</span>
                  </div>
                )}
              </div>
            </div>

          </div>{/* /body */}
        </div>{/* /card */}
      </div>{/* /centre wrapper */}
    </div>/* /overlay */
  );
}
