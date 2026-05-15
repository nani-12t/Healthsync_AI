from beanie import Document, Indexed
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class User(Document):
    email: Indexed(EmailStr, unique=True)
    hashed_password: str
    full_name: Optional[str] = None
    is_active: bool = True
    role: str = "patient" # Or "doctor", "admin"
    created_at: datetime = datetime.utcnow()
    
    # Access Control list for explicit user-controlled consent sharing
    allowed_access_list: List[str] = [] # list of user IDs allowed to view records

    class Settings:
        name = "users"

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: Optional[str] = None

class UserResponse(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    role: str
    is_active: bool
