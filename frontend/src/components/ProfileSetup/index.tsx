'use client';

import { useState } from 'react';

interface ProfileData {
  username: string;
  email: string;
  proficiency_level: 'beginner' | 'intermediate' | 'advanced';
  learning_style: 'visual' | 'hands-on' | 'conceptual';
  preferred_topics: string[];
}

interface Props {
  onProfileCreated: (profile: any) => void;
}

const LEVEL_INFO = {
  beginner: {
    emoji: '🌱',
    title: 'Beginner',
    desc: 'Just starting out',
    color: 'border-green-400 bg-green-50'
  },
  intermediate: {
    emoji: '🚀',
    title: 'Intermediate',
    desc: 'Building skills',
    color: 'border-blue-400 bg-blue-50'
  },
  advanced: {
    emoji: '⚡',
    title: 'Advanced',
    desc: 'Deep knowledge',
    color: 'border-purple-400 bg-purple-50'
  }
};

const STYLE_INFO = {
  visual: { emoji: '👁️', title: 'Visual', desc: 'Diagrams & charts' },
  'hands-on': { emoji: '💻', title: 'Hands-on', desc: 'Code examples' },
  conceptual: { emoji: '🧠', title: 'Conceptual', desc: 'Theory first' }
};

export default function ProfileSetup({ onProfileCreated }: Props) {
  const [step, setStep] = useState(1);   // Which step we're on (1, 2, 3)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [profile, setProfile] = useState<ProfileData>({
    username: '',
    email: '',
    proficiency_level: 'beginner',
    learning_style: 'visual',
    preferred_topics: []
  });

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:8000/api/profile/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'Failed to create profile');
      }
      
      const data = await response.json();
      
      // Save to localStorage for persistence
      localStorage.setItem('genai_tutor_user', JSON.stringify(data));
      
      onProfileCreated(data);
      
    } catch (err: any) {
      setError(err.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-2xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🎓 GenAI Tutor
          </h1>
          <p className="text-gray-500">
            Let's set up your personalized learning profile
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                              text-sm font-bold transition-all ${
                step >= s
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {step > s ? '✓' : s}
              </div>
              {s < 3 && (
                <div className={`w-16 h-1 rounded transition-all ${
                  step > s ? 'bg-indigo-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Labels */}
        <div className="flex justify-between text-xs text-gray-500 mb-8 px-4">
          <span>Basic Info</span>
          <span>Your Level</span>
          <span>Learning Style</span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">

          {/* STEP 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">
                👋 What should we call you?
              </h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={profile.username}
                  onChange={(e) => setProfile({
                    ...profile,
                    username: e.target.value
                  })}
                  placeholder="e.g. anshita123"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                           focus:border-indigo-500 outline-none text-lg transition"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({
                    ...profile,
                    email: e.target.value
                  })}
                  placeholder="e.g. anshita@example.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                           focus:border-indigo-500 outline-none text-lg transition"
                />
              </div>
              
              <button
                onClick={() => setStep(2)}
                disabled={!profile.username || !profile.email}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl 
                         font-bold text-lg hover:bg-indigo-700 transition
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue →
              </button>
            </div>
          )}

          {/* STEP 2: Choose Level */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">
                📊 What's your current level?
              </h2>
              
              <div className="grid gap-4">
                {(Object.entries(LEVEL_INFO) as any).map(([key, info]: any) => (
                  <button
                    key={key}
                    onClick={() => setProfile({
                      ...profile,
                      proficiency_level: key
                    })}
                    className={`p-5 border-2 rounded-xl text-left transition-all ${
                      profile.proficiency_level === key
                        ? info.color + ' border-opacity-100 shadow-md scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{info.emoji}</span>
                      <div>
                        <div className="font-bold text-lg">{info.title}</div>
                        <div className="text-gray-500 text-sm">{info.desc}</div>
                      </div>
                      {profile.proficiency_level === key && (
                        <span className="ml-auto text-2xl">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border-2 border-gray-200 text-gray-600 
                           py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-indigo-600 text-white py-4 rounded-xl 
                           font-bold text-lg hover:bg-indigo-700 transition"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Learning Style */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">
                🎯 How do you learn best?
              </h2>
              
              <div className="grid gap-4">
                {(Object.entries(STYLE_INFO) as any).map(([key, info]: any) => (
                  <button
                    key={key}
                    onClick={() => setProfile({
                      ...profile,
                      learning_style: key
                    })}
                    className={`p-5 border-2 rounded-xl text-left transition-all ${
                      profile.learning_style === key
                        ? 'border-indigo-400 bg-indigo-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{info.emoji}</span>
                      <div>
                        <div className="font-bold text-lg">{info.title}</div>
                        <div className="text-gray-500 text-sm">{info.desc}</div>
                      </div>
                      {profile.learning_style === key && (
                        <span className="ml-auto text-2xl">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
                  ❌ {error}
                </div>
              )}
              
              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 border-2 border-gray-200 text-gray-600 
                           py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition"
                >
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-green-600 text-white py-4 rounded-xl 
                           font-bold text-lg hover:bg-green-700 transition
                           disabled:opacity-50"
                >
                  {loading ? '⏳ Creating...' : '🚀 Start Learning!'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}