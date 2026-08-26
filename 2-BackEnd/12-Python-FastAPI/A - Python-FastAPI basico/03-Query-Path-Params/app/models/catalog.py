from decimal import Decimal
from typing import List, Optional

from pydantic import BaseModel, Field, validator


class CatalogItem(BaseModel):
    id: int = Field(..., ge=1)
    category: str = Field(..., min_length=3, max_length=40)
    slug: str = Field(..., min_length=3, max_length=60)
    name: str = Field(..., min_length=3, max_length=80)
    price: Decimal = Field(..., gt=0)
    tags: List[str] = Field(default_factory=list)


class SearchQuery(BaseModel):
    term: Optional[str] = Field(default=None, min_length=2, max_length=40)
    tag: Optional[str] = Field(default=None, min_length=2, max_length=20)
    min_price: Optional[Decimal] = Field(default=None, gt=0)
    max_price: Optional[Decimal] = Field(default=None, gt=0)
    limit: int = Field(default=10, ge=1, le=20)

    @validator("term", "tag")
    def normalize_optional_text(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return value
        cleaned = value.strip().lower()
        if not cleaned:
            raise ValueError("query text cannot be blank")
        return cleaned


class CatalogPath(BaseModel):
    category: str = Field(..., min_length=3, max_length=40)
    slug: str = Field(..., min_length=3, max_length=60)

    @validator("category", "slug")
    def normalize_path_segment(cls, value: str) -> str:
        cleaned = value.strip().lower()
        if not cleaned:
            raise ValueError("path segment cannot be blank")
        return cleaned


class SearchResult(BaseModel):
    total: int = Field(..., ge=0)
    applied_filters: dict[str, str]
    items: List[CatalogItem]
