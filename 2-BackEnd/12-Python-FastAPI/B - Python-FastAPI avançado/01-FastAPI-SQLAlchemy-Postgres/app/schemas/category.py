from pydantic import BaseModel, Field, validator


class CategoryBase(BaseModel):
    name: str = Field(..., min_length=3, max_length=80)
    slug: str = Field(..., min_length=3, max_length=80)

    @validator("name", "slug")
    def normalize_text(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("field cannot be blank")
        return cleaned

    @validator("slug")
    def normalize_slug(cls, value: str) -> str:
        return value.lower().replace(" ", "-")


class CategoryCreate(CategoryBase):
    pass


class CategoryRead(CategoryBase):
    id: int

    class Config:
        orm_mode = True
