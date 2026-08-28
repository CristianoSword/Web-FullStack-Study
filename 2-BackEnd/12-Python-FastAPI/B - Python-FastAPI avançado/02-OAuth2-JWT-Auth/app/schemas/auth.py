from typing import List, Optional

from pydantic import BaseModel, EmailStr, Field, validator


class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    full_name: str = Field(..., min_length=5, max_length=120)
    password: str = Field(..., min_length=8, max_length=64)
    confirm_password: str = Field(..., min_length=8, max_length=64)
    role: str = Field(default="member", regex="^(member|admin)$")

    @validator("username", "full_name")
    def normalize_text(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("field cannot be blank")
        return cleaned

    @validator("username")
    def normalize_username(cls, value: str) -> str:
        return value.lower().replace(" ", "_")

    @validator("email")
    def normalize_email(cls, value: EmailStr) -> str:
        return str(value).lower()


class UserRead(BaseModel):
    id: int
    username: str
    email: EmailStr
    full_name: str
    role: str
    is_active: bool

    class Config:
        orm_mode = True


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    scope: str = ""


class TokenPayload(BaseModel):
    sub: str
    scopes: List[str] = Field(default_factory=list)
    exp: int


class LoginResponse(BaseModel):
    user: UserRead
    token: TokenResponse


class MessageResponse(BaseModel):
    detail: str
