from decimal import Decimal
from typing import Optional

from pydantic import BaseModel, Field

from app.schemas.category import CategoryRead


class ProductBase(BaseModel):
    name: str = Field(..., min_length=3, max_length=120)
    sku: str = Field(..., min_length=3, max_length=40)
    description: Optional[str] = Field(default=None, max_length=500)
    price: Decimal = Field(..., gt=0)
    stock: int = Field(..., ge=0)
    category_id: int = Field(..., ge=1)


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = Field(default=None, min_length=3, max_length=120)
    description: Optional[str] = Field(default=None, max_length=500)
    price: Optional[Decimal] = Field(default=None, gt=0)
    stock: Optional[int] = Field(default=None, ge=0)
    category_id: Optional[int] = Field(default=None, ge=1)


class ProductRead(ProductBase):
    id: int
    category: Optional[CategoryRead] = None

    class Config:
        orm_mode = True
