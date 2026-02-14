from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Create the FastAPI app
app = FastAPI(title="GenAI Tutor API", version="1.0.0")

# Allow frontend to talk to backend (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Our first API endpoint - a simple test
@app.get("/")
def read_root():
    return {
        "message": "Welcome to GenAI Tutor API!",
        "status": "running"
    }

# Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "healthy"}