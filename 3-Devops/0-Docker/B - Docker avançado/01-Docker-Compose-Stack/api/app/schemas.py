from pydantic import BaseModel, Field


class ProductCreate(BaseModel):
    sku: str = Field(min_length=3)
    name: str = Field(min_length=2)
    price: float = Field(ge=0)


class ProductRead(ProductCreate):
    id: int


class HealthStatus(BaseModel):
    status: str
    postgres: str
    redis: str


class StackStatus(BaseModel):
    api: str
    postgres_dsn: str
    redis_url: str
    cache_ttl_seconds: int
