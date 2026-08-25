from datetime import datetime
from decimal import Decimal
from typing import Optional

from pydantic import BaseModel, Field, validator


class ItemBase(BaseModel):
    name: str = Field(..., min_length=3, max_length=80)
    sku: str = Field(..., min_length=3, max_length=24)
    description: Optional[str] = Field(default=None, max_length=300)
    price: Decimal = Field(..., gt=0)
    quantity: int = Field(..., ge=0)

    @validator("name", "sku")
    def strip_required_text(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("text fields cannot be blank")
        return cleaned

    @validator("description")
    def strip_optional_description(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return value
        cleaned = value.strip()
        return cleaned or None

    @validator("sku")
    def normalize_sku(cls, value: str) -> str:
        return value.upper().replace(" ", "-")


class ItemCreate(ItemBase):
    pass


class ItemUpdate(BaseModel):
    name: Optional[str] = Field(default=None, min_length=3, max_length=80)
    description: Optional[str] = Field(default=None, max_length=300)
    price: Optional[Decimal] = Field(default=None, gt=0)
    quantity: Optional[int] = Field(default=None, ge=0)

    @validator("name")
    def strip_name(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return value
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("name cannot be blank")
        return cleaned

    @validator("description")
    def normalize_description(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return value
        cleaned = value.strip()
        return cleaned or None


class ItemRecord(ItemBase):
    id: int = Field(..., ge=1)
    created_at: datetime
    updated_at: datetime


class ErrorPayload(BaseModel):
    detail: str = Field(..., min_length=3)
