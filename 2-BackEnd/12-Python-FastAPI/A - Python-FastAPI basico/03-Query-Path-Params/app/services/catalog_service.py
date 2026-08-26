from decimal import Decimal
from typing import List

from app.core.exceptions import CatalogItemNotFoundError
from app.models.catalog import CatalogItem, CatalogPath, SearchQuery, SearchResult


class CatalogService:
    def __init__(self) -> None:
        self._items = [
            CatalogItem(
                id=1,
                category="audio",
                slug="wireless-headphones",
                name="Wireless Headphones",
                price=Decimal("799.90"),
                tags=["bluetooth", "music", "wireless"],
            ),
            CatalogItem(
                id=2,
                category="peripherals",
                slug="mechanical-keyboard",
                name="Mechanical Keyboard",
                price=Decimal("459.00"),
                tags=["keyboard", "rgb", "wireless"],
            ),
            CatalogItem(
                id=3,
                category="video",
                slug="ultrawide-monitor",
                name="Ultrawide Monitor",
                price=Decimal("1899.00"),
                tags=["monitor", "office", "usb-c"],
            ),
            CatalogItem(
                id=4,
                category="network",
                slug="mesh-router",
                name="Mesh Router",
                price=Decimal("999.00"),
                tags=["wifi", "network", "smart-home"],
            ),
        ]

    def search(self, query: SearchQuery) -> SearchResult:
        results: List[CatalogItem] = []
        for item in self._items:
            if query.term and query.term not in item.name.lower():
                continue
            if query.tag and query.tag not in [tag.lower() for tag in item.tags]:
                continue
            if query.min_price and item.price < query.min_price:
                continue
            if query.max_price and item.price > query.max_price:
                continue
            results.append(item)

        limited = results[: query.limit]
        filters = {}
        if query.term:
            filters["term"] = query.term
        if query.tag:
            filters["tag"] = query.tag
        if query.min_price is not None:
            filters["min_price"] = str(query.min_price)
        if query.max_price is not None:
            filters["max_price"] = str(query.max_price)
        filters["limit"] = str(query.limit)

        return SearchResult(total=len(results), applied_filters=filters, items=limited)

    def get_by_path(self, payload: CatalogPath) -> CatalogItem:
        for item in self._items:
            if item.category == payload.category and item.slug == payload.slug:
                return item
        raise CatalogItemNotFoundError(payload.category, payload.slug)
