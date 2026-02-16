// API base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Types for requests and responses
export interface GreetingRequest {
  student_name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface GreetingResponse {
  greeting: string;
  student_name: string;
  level: string;
}

export interface TopicRequest {
  topic: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  learning_style?: string;
}

export interface TopicResponse {
  topic: string;
  level: string;
  explanation: string;
  word_count: number;
  estimated_reading_time: number;
  model_used: string;
}

export interface PracticeQuestionsRequest {
  topic: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  num_questions?: number;
}

export interface PracticeQuestionsResponse {
  topic: string;
  level: string;
  questions: string;
  count: number;
}

/**
 * API client for GenAI Tutor backend
 */
export const api = {
  /**
   * Get a personalized greeting
   */
  async getGreeting(request: GreetingRequest): Promise<GreetingResponse> {
    const response = await fetch(`${API_URL}/api/learning/greeting`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to get greeting: ${response.statusText}`);
    }

    return response.json();
  },

  /**
   * Get explanation for a topic
   */
  async explainTopic(request: TopicRequest): Promise<TopicResponse> {
    const response = await fetch(`${API_URL}/api/learning/explain`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to explain topic: ${response.statusText}`);
    }

    return response.json();
  },

  /**
   * Get practice questions for a topic
   */
  async getPracticeQuestions(
    request: PracticeQuestionsRequest
  ): Promise<PracticeQuestionsResponse> {
    const response = await fetch(`${API_URL}/api/learning/practice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to get practice questions: ${response.statusText}`);
    }

    return response.json();
  },

  /**
   * Health check
   */
  async healthCheck(): Promise<any> {
    const response = await fetch(`${API_URL}/health`);
    return response.json();
  },
};