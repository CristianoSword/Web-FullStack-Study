from typing import Optional

from pydantic import BaseModel, Field, validator


class GreetingPayload(BaseModel):
    project: str = Field(..., min_length=3)
    message: str = Field(..., min_length=3)
    version: str = Field(..., min_length=1)
    target: str = Field(..., min_length=2, max_length=40)


class GreetingQuery(BaseModel):
    name: Optional[str] = Field(default="developer", min_length=2, max_length=40)

    @validator("name")
    def normalize_name(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return value
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("name cannot be blank")
        return cleaned


class HealthPayload(BaseModel):
    status: str = Field(..., min_length=2)
    service: str = Field(..., min_length=3)
    version: str = Field(..., min_length=1)
    environment: str = Field(..., min_length=2)
