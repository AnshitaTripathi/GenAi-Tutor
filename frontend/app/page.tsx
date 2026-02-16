'use client';

import { useState } from 'react';
import { api } from '@/services/api';

export default function Home() {
  const [name, setName] = useState('');
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [greeting, setGreeting] = useState('');
  const [topic, setTopic] = useState('');
  const [explanation, setExplanation] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGreeting = async () => {
    if (!name) return;
    setLoading(true);
    try {
      const res = await api.getGreeting({ student_name: name, level });
      setGreeting(res.greeting);
    } catch (err) {
      alert('Error! Is backend running?');
    }
    setLoading(false);
  };
  
  const handleExplain = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const res = await api.explainTopic({ topic, level, learning_style: 'visual' });
      setExplanation(res);
    } catch (err) {
      alert('Error! Is backend running?');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            🤖 GenAI Tutor
          </h1>
          <p className="text-xl text-gray-600">
            Powered by FREE Groq AI (Llama 3.1 70B) 🚀
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            100% FREE • No Credit Card • No Limits
          </div>
        </div>

        {/* Level Selector */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <label className="block text-sm font-semibold mb-3">Select Your Level:</label>
          <div className="grid grid-cols-3 gap-4">
            {(['beginner', 'intermediate', 'advanced'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevel(lvl)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  level === lvl
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="font-bold capitalize">{lvl}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Greeting Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            👋 Get AI Greeting
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
            />
            <button
              onClick={handleGreeting}
              disabled={loading || !name}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? '🤔 AI is thinking...' : '✨ Generate Greeting'}
            </button>
            {greeting && (
              <div className="mt-4 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200">
                <p className="text-lg leading-relaxed">{greeting}</p>
              </div>
            )}
          </div>
        </div>

        {/* Topic Explanation */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            📚 Explain Any Topic
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., arrays, linked lists, binary search..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none"
            />
            <button
              onClick={handleExplain}
              disabled={loading || !topic}
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? '🧠 AI is generating...' : '🚀 Explain Topic'}
            </button>
            {explanation && (
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>📖 {explanation.word_count} words</span>
                  <span>⏱️ {explanation.estimated_reading_time} min read</span>
                  <span>🤖 {explanation.model_used}</span>
                </div>
                <div className="p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border-2 border-green-200">
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {explanation.explanation}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Built with ❤️ using FastAPI, Next.js, and FREE Groq AI</p>
          <p className="mt-2">No API costs • Perfect for learning • Unlimited potential</p>
        </div>
      </div>
    </main>
  );
}