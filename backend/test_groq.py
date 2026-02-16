from langchain_groq import ChatGroq
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

print(" Testing Groq API Connection...")
print("=" * 50)

# Get API key
api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    print(" ERROR: GROQ_API_KEY not found in .env file!")
    print("Please add it to your .env file")
    exit()

print(f" API Key found: {api_key[:10]}...")

# Try to initialize Groq
try:
    llm = ChatGroq(
        groq_api_key=api_key,
        model_name="llama-3.3-70b-versatile",
        temperature=0.7
    )
    print(" ChatGroq initialized successfully!")
    
    # Test a simple prompt
    print("\n Testing AI response...")
    response = llm.invoke("Say 'Hello! I am working correctly!' in a friendly way.")
    
    print("=" * 50)
    print(" SUCCESS! AI Response:")
    print(response.content)
    print("=" * 50)
    print("\n Your Groq API is working perfectly!")
    
except Exception as e:
    print(f" ERROR: {str(e)}")
    print("\nPossible issues:")
    print("1. Invalid API key")
    print("2. Wrong model name")
    print("3. Network connection issue")