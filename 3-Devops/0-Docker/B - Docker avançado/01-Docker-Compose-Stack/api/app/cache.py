import json

from redis.asyncio import from_url


class RedisCache:
    def __init__(self, url: str) -> None:
        self.client = from_url(url, decode_responses=True)

    async def get_products(self) -> list[dict] | None:
        cached = await self.client.get("products:list")
        if not cached:
            return None
        return json.loads(cached)

    async def set_products(self, products: list[dict], ttl_seconds: int) -> None:
        await self.client.set("products:list", json.dumps(products), ex=ttl_seconds)

    async def invalidate_products(self) -> None:
        await self.client.delete("products:list")

    async def ping(self) -> bool:
        return bool(await self.client.ping())
