from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate

from langchain_core.output_parsers import StrOutputParser

from ..config import settings

class AITutorService:
    """
    FREE AI Tutor Service using Groq (Llama 3)
    
    Cost: $0.00 - Completely FREE!
    Speed: 1-2 seconds per response
    Limit: 30 requests/minute, 14,400/day
    """
    
    def __init__(self):
        # Initialize Groq with FREE API
        self.llm = ChatGroq(
            groq_api_key=settings.groq_api_key,
            model_name="Llama-3.3-70B-versatile",  # Best free model!
            temperature=0.7,  # Creativity level (0-1)
            max_tokens=1000,  # Response length
        )
        
        print(" AI Service initialized with Groq (FREE!)")
    
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
        
        # Create chain: prompt → AI → text output
        chain = prompt | self.llm | StrOutputParser()
        
        # Execute
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
        
        # Customize prompt based on level
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
        
        # Calculate reading time (average 200 words/minute)
        word_count = len(explanation.split())
        reading_time = max(1, word_count // 200)
        
        return {
            "topic": topic,
            "level": level,
            "explanation": explanation,
            "word_count": word_count,
            "estimated_reading_time": reading_time,
            "model_used": "Llama 3.1 70B (FREE)"
        }
    
    async def generate_practice_questions(
        self,
        topic: str,
        level: str,
        num_questions: int = 3
    ) -> list:
        """
        Generate practice questions for a topic.
        
        Args:
            topic: The topic to practice
            level: Student level
            num_questions: How many questions (default 3)
            
        Returns:
            List of practice questions with hints
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

# Create singleton instance
ai_service = AITutorService()