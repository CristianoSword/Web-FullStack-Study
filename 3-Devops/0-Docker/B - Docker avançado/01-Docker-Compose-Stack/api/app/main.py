from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException

from app.cache import RedisCache
from app.config import get_settings
from app.db import PostgresClient
from app.repository import ProductRepository
from app.schemas import HealthStatus, ProductCreate, ProductRead, StackStatus


settings = get_settings()
postgres = PostgresClient(settings.postgres_dsn)
cache = RedisCache(settings.redis_url)
repository = ProductRepository(postgres)


@asynccontextmanager
async def lifespan(_: FastAPI):
    postgres.initialize()
    yield


app = FastAPI(title="docker-compose-stack", lifespan=lifespan)


@app.get("/health", response_model=HealthStatus)
async def get_health() -> HealthStatus:
    redis_ok = await cache.ping()
    return HealthStatus(status="ok", postgres="reachable", redis="reachable" if redis_ok else "unreachable")


@app.get("/products", response_model=list[ProductRead])
async def list_products() -> list[ProductRead]:
    cached = await cache.get_products()
    if cached is not None:
        return [ProductRead(**item) for item in cached]

    products = repository.list_products()
    await cache.set_products(products, settings.cache_ttl_seconds)
    return [ProductRead(**item) for item in products]


@app.post("/products", response_model=ProductRead, status_code=201)
async def create_product(payload: ProductCreate) -> ProductRead:
    try:
        product = repository.create_product(payload.model_dump())
    except Exception as error:
        raise HTTPException(status_code=422, detail=f"could not create product: {error}") from error

    await cache.invalidate_products()
    return ProductRead(**product)


@app.get("/stack", response_model=StackStatus)
async def get_stack() -> StackStatus:
    return StackStatus(
        api="docker-compose-stack-api",
        postgres_dsn=settings.postgres_dsn,
        redis_url=settings.redis_url,
        cache_ttl_seconds=settings.cache_ttl_seconds,
    )
