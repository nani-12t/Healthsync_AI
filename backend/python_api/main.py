from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from core.config import settings
from models.user import User
from routes import auth

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="High-performance backend for HealthSync AI with strict compliance & security.",
    version="1.0.0"
)

# CORS configuration matches Node.js but can be restricted further for production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with specific frontend domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_db_client():
    # Initialize MongoDB client and Beanie ODM
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    await init_beanie(database=client[settings.DATABASE_NAME], document_models=[User])
    print(f"Connected to MongoDB at {settings.MONGODB_URI}")

@app.get("/")
async def root():
    return {"message": "HealthSync Backend Running"}

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
