from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "HealthSync AI Backend"
    MONGODB_URI: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "healthsync_db"
    SECRET_KEY: str = "supersecretkey_change_in_production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Security & Compliance Flags (HIPAA, GDPR, CCPA)
    DATA_SOVEREIGNTY_REGION: str = "IN" # Data stored on Indian servers
    ENABLE_RASP_CHECKS: bool = True
    ENABLE_AI_THREAT_DETECTION: bool = True

    class Config:
        env_file = ".env"

settings = Settings()
