from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from models.user import User, UserCreate, UserResponse
from core.security import get_password_hash, verify_password, create_access_token
from typing import Any

router = APIRouter()

@router.post("/register", response_model=UserResponse)
async def register(user_in: UserCreate) -> Any:
    """
    Register a new user.
    """
    user = await User.find_one(User.email == user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system.",
        )
    user = User(
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        full_name=user_in.full_name,
    )
    await user.insert()
    return user

@router.post("/login/access-token")
async def login_access_token(form_data: OAuth2PasswordRequestForm = Depends()) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests.
    """
    user = await User.find_one(User.email == form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
        
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}
