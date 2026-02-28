'use client';

import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import ProfileSetup from '@/components/ProfileSetup';
import ArrayVisualizer from '@/components/Visualizations/ArrayVisualizer';
import StackVisualizer from '@/components/Visualizations/StackVisualizer';
import QueueVisualizer from '@/components/Visualizations/QueueVisualizer';
import LinkedListVisualizer from '@/components/Visualizations/LinkedListVisualizer';
import BinaryTreeVisualizer from '@/components/Visualizations/BinaryTreeVisualizer';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState('');
  const [explanation, setExplanation] = useState<any>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [showVisualizer, setShowVisualizer] = useState(false);
  const [visualizerTopic, setVisualizerTopic] = useState('');
  const [visualizerType, setVisualizerType] = useState<'array' | 'stack' | 'queue' | 'linkedlist' | 'binarytree'>('array');

  useEffect(() => {
    const savedUser = localStorage.getItem('genai_tutor_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      generateGreeting(parsed.user.username, parsed.profile.proficiency_level);
    }
    setLoading(false);
  }, []);

  const generateGreeting = async (name: string, level: string) => {
    try {
      const res = await api.getGreeting({
        student_name: name,
        level: level as any
      });
      setGreeting(res.greeting);
    } catch (err) {
      console.error('Could not generate greeting');
    }
  };

  const handleProfileCreated = (data: any) => {
    setUser(data);
    generateGreeting(data.user.username, data.profile.proficiency_level);
  };

  const handleExplain = async () => {
    if (!topic) return;
    setAiLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8000/api/learning/explain?username=${user.user.username}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            topic,
            level: user.profile.proficiency_level,
            learning_style: user.profile.learning_style
          })
        }
      );
      const data = await res.json();
      setExplanation(data);
    } catch (err) {
      alert('Error! Is backend running?');
    }
    setAiLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('genai_tutor_user');
    setUser(null);
    setGreeting('');
    setExplanation(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">⏳ Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <ProfileSetup onProfileCreated={handleProfileCreated} />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {user.user.username[0].toUpperCase()}
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-lg">{user.user.username}</h2>
              <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                user.profile.proficiency_level === 'beginner' ? 'bg-green-100 text-green-700' :
                user.profile.proficiency_level === 'intermediate' ? 'bg-blue-100 text-blue-700' :
                'bg-purple-100 text-purple-700'
              }`}>
                {user.profile.proficiency_level}
              </span>
            </div>
          </div>
          <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-red-500 transition">
            Change Profile
          </button>
        </div>

        {/* Greeting */}
        {greeting && (
          <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6 mb-6">
            <p className="text-lg text-gray-700 leading-relaxed">💬 {greeting}</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="text-3xl font-bold text-indigo-600">{user.profile.total_sessions}</div>
            <div className="text-sm text-gray-500 mt-1">Sessions</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="text-3xl font-bold text-green-600">{user.total_topics_studied}</div>
            <div className="text-sm text-gray-500 mt-1">Topics Studied</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="text-3xl font-bold text-purple-600 capitalize">{user.profile.learning_style}</div>
            <div className="text-sm text-gray-500 mt-1">Learning Style</div>
          </div>
        </div>

        {/* Topic Input */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📚 What would you like to learn today?</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleExplain()}
              placeholder="e.g., arrays, linked lists, recursion..."
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 outline-none text-lg"
            />
            <button
              onClick={handleExplain}
              disabled={aiLoading || !topic}
              className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition disabled:opacity-50 whitespace-nowrap"
            >
              {aiLoading ? '🧠 Thinking...' : '✨ Explain'}
            </button>
          </div>
        </div>

        {/* Explanation */}
        {explanation && (
          <div className="space-y-4 mb-6">
            <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800 capitalize">📖 {explanation.topic}</h3>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>⏱️ {explanation.estimated_reading_time} min read</span>
                  <span>📝 {explanation.word_count} words</span>
                </div>
              </div>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap leading-relaxed text-gray-700">
                  {explanation.explanation}
                </div>
              </div>
            </div>

            {/* Visualizer Selector */}
            <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-6">
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">🎨 Interactive Visualizations</h3>
                <p className="text-sm text-gray-600">Choose a data structure to visualize and interact with</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <button
                  onClick={() => { setVisualizerType('array'); setShowVisualizer(true); }}
                  className="px-3 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105 flex flex-col items-center justify-center gap-1"
                >
                  <span className="text-2xl">📊</span>
                  <span className="text-sm">Array</span>
                </button>

                <button
                  onClick={() => { setVisualizerType('stack'); setShowVisualizer(true); }}
                  className="px-3 py-5 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105 flex flex-col items-center justify-center gap-1"
                >
                  <span className="text-2xl">🥞</span>
                  <span className="text-sm">Stack</span>
                </button>

                <button
                  onClick={() => { setVisualizerType('queue'); setShowVisualizer(true); }}
                  className="px-3 py-5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105 flex flex-col items-center justify-center gap-1"
                >
                  <span className="text-2xl">🎫</span>
                  <span className="text-sm">Queue</span>
                </button>

                <button
                  onClick={() => { setVisualizerType('linkedlist'); setShowVisualizer(true); }}
                  className="px-3 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105 flex flex-col items-center justify-center gap-1"
                >
                  <span className="text-2xl">🔗</span>
                  <span className="text-sm">Linked List</span>
                </button>

                <button
                  onClick={() => { setVisualizerType('binarytree'); setShowVisualizer(true); }}
                  className="px-3 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105 flex flex-col items-center justify-center gap-1"
                >
                  <span className="text-2xl">🌳</span>
                  <span className="text-sm">Tree</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Recent Topics */}
        {user.recent_sessions && user.recent_sessions.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-800 mb-4">🕒 Recent Topics</h3>
            <div className="space-y-3">
              {user.recent_sessions.map((session: any) => (
                <div
                  key={session.id}
                  onClick={() => setTopic(session.topic)}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-indigo-50 cursor-pointer transition"
                >
                  <span className="font-medium capitalize">{session.topic}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(session.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Visualizer Popups */}
        {showVisualizer && visualizerType === 'array' && (
          <ArrayVisualizer onClose={() => setShowVisualizer(false)} />
        )}
        {showVisualizer && visualizerType === 'stack' && (
          <StackVisualizer onClose={() => setShowVisualizer(false)} />
        )}
        {showVisualizer && visualizerType === 'queue' && (
          <QueueVisualizer onClose={() => setShowVisualizer(false)} />
        )}
        {showVisualizer && visualizerType === 'linkedlist' && (
          <LinkedListVisualizer onClose={() => setShowVisualizer(false)} />
        )}
        {showVisualizer && visualizerType === 'binarytree' && (
          <BinaryTreeVisualizer onClose={() => setShowVisualizer(false)} />
        )}

      </div>
    </main>
  );
}