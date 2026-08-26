from fastapi import Request

from app.services.catalog_service import CatalogService


def get_catalog_service(request: Request) -> CatalogService:
    return request.app.state.catalog_service
