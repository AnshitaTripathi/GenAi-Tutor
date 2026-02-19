from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from ..config import settings
import json
import re

class AITutorService:
    """
    FREE AI Tutor Service using Groq (Llama 3.3)
    
    Cost: $0.00 - Completely FREE!
    Speed: 1-2 seconds per response
    Limit: 30 requests/minute, 14,400/day
    """
    
    def __init__(self):
        # Initialize Groq with FREE API
        self.llm = ChatGroq(
            groq_api_key=settings.groq_api_key,
            model_name="llama-3.3-70b-versatile",
            temperature=0.7,
            max_tokens=1000,
        )
        
        print("✅ AI Service initialized with Groq (FREE!)")
        print("   Model: Llama 3.3 70B Versatile")
    
    async def generate_greeting(self, student_name: str, level: str) -> str:
        """
        Generate a personalized greeting for the student.
        
        Args:
            student_name: Student's name
            level: beginner, intermediate, or advanced
            
        Returns:
            Personalized greeting message
        """
        
        prompt = ChatPromptTemplate.from_messages([
            ("system", """You are a friendly and encouraging AI tutor named "TutorBot".
            
            Your role:
            - Welcome students warmly
            - Be enthusiastic about learning
            - Adapt your tone to their level
            - Keep it brief (2-3 sentences)
            
            Student Level: {level}
            - Beginner: Be extra encouraging, use simple language
            - Intermediate: Be supportive, acknowledge their progress
            - Advanced: Be respectful, challenge them appropriately
            """),
            ("user", "Generate a greeting for {name}")
        ])
        
        chain = prompt | self.llm | StrOutputParser()
        
        result = await chain.ainvoke({
            "name": student_name,
            "level": level
        })
        
        return result
    
    async def explain_topic(
        self,
        topic: str,
        level: str,
        learning_style: str = "visual"
    ) -> dict:
        """
        Generate topic explanation based on student level.
        
        Args:
            topic: What to explain (e.g., "arrays", "linked lists")
            level: Student's proficiency
            learning_style: How they learn best
            
        Returns:
            Dictionary with explanation and metadata
        """
        
        if level == "beginner":
            complexity = "Use very simple language. Start with a real-world analogy. Avoid jargon."
        elif level == "intermediate":
            complexity = "Use some technical terms but explain them. Assume basic programming knowledge."
        else:
            complexity = "Use technical language. Discuss edge cases and optimizations."
        
        prompt = ChatPromptTemplate.from_messages([
            ("system", """You are an expert computer science tutor.
            
            Topic: {topic}
            Student Level: {level}
            Learning Style: {learning_style}
            
            Instructions:
            {complexity}
            
            Structure your explanation:
            1. **Real-World Analogy** - Simple comparison
            2. **What It Is** - Clear definition
            3. **How It Works** - Step-by-step explanation
            4. **Practical Example** - Code or scenario
            5. **Key Points** - 3 important takeaways
            
            Keep it concise but comprehensive (400-600 words).
            Use markdown formatting for better readability.
            """),
            ("user", "Explain {topic} to me.")
        ])
        
        chain = prompt | self.llm | StrOutputParser()
        
        explanation = await chain.ainvoke({
            "topic": topic,
            "level": level,
            "learning_style": learning_style,
            "complexity": complexity
        })
        
        word_count = len(explanation.split())
        reading_time = max(1, word_count // 200)
        
        return {
            "topic": topic,
            "level": level,
            "explanation": explanation,
            "word_count": word_count,
            "estimated_reading_time": reading_time,
            "model_used": "Llama 3.3 70B (FREE)"
        }
    
    async def generate_practice_questions(
        self,
        topic: str,
        level: str,
        num_questions: int = 3
    ) -> dict:
        """
        Generate practice questions for a topic.
        
        Args:
            topic: The topic to practice
            level: Student level
            num_questions: How many questions (default 3)
            
        Returns:
            Dictionary with questions
        """
        
        prompt = ChatPromptTemplate.from_messages([
            ("system", """Generate {num_questions} practice questions about {topic}.
            
            Level: {level}
            
            For each question:
            - Make it relevant and practical
            - Adjust difficulty to level
            - Include a helpful hint
            
            Format as a numbered list with hints below each question.
            """),
            ("user", "Generate practice questions")
        ])
        
        chain = prompt | self.llm | StrOutputParser()
        
        result = await chain.ainvoke({
            "topic": topic,
            "level": level,
            "num_questions": num_questions
        })
        
        return {
            "topic": topic,
            "level": level,
            "questions": result,
            "count": num_questions
        }
    
    async def generate_quiz(
        self,
        topic: str,
        level: str,
        num_questions: int = 5
    ) -> list:
        """
        Generate a quiz with multiple choice questions.
        
        Args:
            topic: What to test on
            level: Student proficiency level
            num_questions: How many questions (default 5)
            
        Returns:
            List of question dictionaries
        """
        
        # Adjust difficulty distribution based on level
        if level == "beginner":
            difficulty_mix = "60% easy, 30% medium, 10% hard"
        elif level == "intermediate":
            difficulty_mix = "20% easy, 60% medium, 20% hard"
        else:  # advanced
            difficulty_mix = "10% easy, 30% medium, 60% hard"
        
        prompt = ChatPromptTemplate.from_messages([
            ("system", """You are an expert quiz generator for computer science topics.

Generate {num_questions} multiple choice questions about {topic} for a {level} level student.

CRITICAL: Return ONLY a valid JSON object. No markdown, no explanations, no extra text.

Format:
{{
  "questions": [
    {{
      "question_number": 1,
      "question_text": "What is the time complexity of binary search?",
      "options": {{
        "A": "O(1)",
        "B": "O(log n)",
        "C": "O(n)",
        "D": "O(n²)"
      }},
      "correct_answer": "B",
      "difficulty": "medium",
      "concept": "time complexity",
      "explanation": "Binary search divides the search space in half each time, resulting in O(log n) complexity."
    }}
  ]
}}

Generate {num_questions} questions now.
Difficulty mix: {difficulty_mix}
Return ONLY the JSON, nothing else.
"""),
            ("user", "Generate the quiz in valid JSON format.")
        ])
        
        chain = prompt | self.llm | StrOutputParser()
        
        try:
            result = await chain.ainvoke({
                "topic": topic,
                "level": level,
                "num_questions": num_questions,
                "difficulty_mix": difficulty_mix
            })
            
            print("=" * 50)
            print("RAW AI RESPONSE:")
            print(result)
            print("=" * 50)
            
            # Remove markdown code blocks
            result = re.sub(r'```json\s*', '', result)
            result = re.sub(r'\s*```', '', result)
            result = result.strip()
            
            # Parse JSON
            quiz_data = json.loads(result)
            
            # Validate structure
            if "questions" not in quiz_data:
                raise ValueError("Response missing 'questions' key")
            
            questions = quiz_data["questions"]
            
            # Ensure all questions have required fields
            for i, q in enumerate(questions):
                if "question_number" not in q:
                    q["question_number"] = i + 1
                if "difficulty" not in q:
                    q["difficulty"] = "medium"
                if "concept" not in q:
                    q["concept"] = topic
                if "explanation" not in q:
                    q["explanation"] = "Explanation not provided."
            
            return questions
            
        except json.JSONDecodeError as e:
            print(f" JSON Parse Error: {e}")
            print(f"Failed to parse: {result[:500]}")
            raise Exception(f"AI returned invalid JSON: {str(e)}")
        except Exception as e:
            print(f" Error generating quiz: {e}")
            raise

# Create singleton instance
ai_service = AITutorService()