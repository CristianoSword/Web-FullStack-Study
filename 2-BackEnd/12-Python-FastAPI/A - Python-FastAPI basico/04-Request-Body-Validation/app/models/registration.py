from typing import Optional

from pydantic import BaseModel, EmailStr, Field, validator


class AddressPayload(BaseModel):
    street: str = Field(..., min_length=5, max_length=120)
    city: str = Field(..., min_length=2, max_length=60)
    state: str = Field(..., min_length=2, max_length=40)
    postal_code: str = Field(..., min_length=8, max_length=10)

    @validator("street", "city", "state")
    def normalize_text(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("field cannot be blank")
        return cleaned

    @validator("postal_code")
    def normalize_postal_code(cls, value: str) -> str:
        digits = "".join(char for char in value if char.isdigit())
        if len(digits) != 8:
            raise ValueError("postal_code must contain 8 digits")
        return digits


class RegistrationRequest(BaseModel):
    full_name: str = Field(..., min_length=5, max_length=80)
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=64)
    confirm_password: str = Field(..., min_length=8, max_length=64)
    age: int = Field(..., ge=18, le=120)
    phone: str = Field(..., min_length=10, max_length=20)
    newsletter_opt_in: bool = False
    company: Optional[str] = Field(default=None, max_length=80)
    address: AddressPayload

    @validator("full_name", "company")
    def normalize_optional_text(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return value
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("field cannot be blank")
        if value is not None and any(char.isdigit() for char in cleaned):
            raise ValueError("text fields cannot contain digits")
        return cleaned

    @validator("password")
    def password_complexity(cls, value: str) -> str:
        if not any(char.isupper() for char in value):
            raise ValueError("password must contain an uppercase letter")
        if not any(char.islower() for char in value):
            raise ValueError("password must contain a lowercase letter")
        if not any(char.isdigit() for char in value):
            raise ValueError("password must contain a digit")
        return value

    @validator("phone")
    def normalize_phone(cls, value: str) -> str:
        digits = "".join(char for char in value if char.isdigit())
        if len(digits) < 10 or len(digits) > 11:
            raise ValueError("phone must contain 10 or 11 digits")
        return digits


class RegistrationResponse(BaseModel):
    customer_id: str = Field(..., min_length=6)
    full_name: str = Field(..., min_length=5, max_length=80)
    email: EmailStr
    masked_phone: str = Field(..., min_length=4)
    city: str = Field(..., min_length=2)
    newsletter_opt_in: bool


class ValidationErrorPayload(BaseModel):
    detail: str = Field(..., min_length=3)
