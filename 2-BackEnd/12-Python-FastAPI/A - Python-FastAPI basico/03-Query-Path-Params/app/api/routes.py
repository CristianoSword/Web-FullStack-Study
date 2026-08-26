from decimal import Decimal
from typing import Optional

from fastapi import APIRouter, Depends, Query

from app.api.dependencies import get_catalog_service
from app.models.catalog import CatalogItem, CatalogPath, SearchQuery, SearchResult
from app.services.catalog_service import CatalogService

router = APIRouter()


@router.get("/health")
def healthcheck() -> dict[str, str]:
    return {"status": "ok", "service": "query-path-params"}


@router.get("/products/search", response_model=SearchResult)
def search_products(
    term: Optional[str] = Query(default=None, min_length=2, max_length=40),
    tag: Optional[str] = Query(default=None, min_length=2, max_length=20),
    min_price: Optional[Decimal] = Query(default=None, gt=0),
    max_price: Optional[Decimal] = Query(default=None, gt=0),
    limit: int = Query(default=10, ge=1, le=20),
    service: CatalogService = Depends(get_catalog_service),
) -> SearchResult:
    query = SearchQuery(
        term=term,
        tag=tag,
        min_price=min_price,
        max_price=max_price,
        limit=limit,
    )
    return service.search(query)


@router.get("/categories/{category}/products/{slug}", response_model=CatalogItem)
def get_product_by_path(
    category: str,
    slug: str,
    service: CatalogService = Depends(get_catalog_service),
) -> CatalogItem:
    path_payload = CatalogPath(category=category, slug=slug)
    return service.get_by_path(path_payload)
