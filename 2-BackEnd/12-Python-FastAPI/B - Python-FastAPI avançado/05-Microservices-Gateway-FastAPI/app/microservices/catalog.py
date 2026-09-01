from decimal import Decimal
from typing import Dict, List

from fastapi import FastAPI, HTTPException


CATALOG_PRODUCTS: List[Dict[str, object]] = [
    {"id": "p-100", "sku": "KB-001", "name": "Mechanical Keyboard", "price": Decimal("499.90"), "stock": 12},
    {"id": "p-101", "sku": "MS-002", "name": "Vertical Mouse", "price": Decimal("259.50"), "stock": 18},
    {"id": "p-102", "sku": "HD-003", "name": "Studio Headphones", "price": Decimal("899.00"), "stock": 7},
]


def create_catalog_app() -> FastAPI:
    app = FastAPI(title="catalog-service")

    @app.get("/health")
    def health() -> dict:
        return {"service": "catalog", "status": "ok", "version": "1.0.0"}

    @app.get("/products")
    def list_products() -> List[Dict[str, object]]:
        return CATALOG_PRODUCTS

    @app.get("/products/{sku}")
    def get_product(sku: str) -> Dict[str, object]:
        normalized_sku = sku.strip().upper()
        for product in CATALOG_PRODUCTS:
            if product["sku"] == normalized_sku:
                return product
        raise HTTPException(status_code=404, detail=f"product not found: {normalized_sku}")

    return app
