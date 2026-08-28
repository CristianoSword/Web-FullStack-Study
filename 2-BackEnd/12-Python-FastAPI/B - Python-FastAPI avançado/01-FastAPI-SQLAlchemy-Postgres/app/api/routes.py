from typing import List

from fastapi import APIRouter, Depends, status

from app.api.dependencies import get_inventory_service
from app.schemas.category import CategoryCreate, CategoryRead
from app.schemas.product import ProductCreate, ProductRead, ProductUpdate
from app.services.inventory_service import InventoryService

router = APIRouter()
categories_router = APIRouter(prefix="/categories", tags=["categories"])
products_router = APIRouter(prefix="/products", tags=["products"])


@router.get("/health")
def healthcheck() -> dict[str, str]:
    return {"status": "ok", "service": "fastapi-sqlalchemy-postgres"}


@categories_router.get("", response_model=List[CategoryRead])
def list_categories(
    service: InventoryService = Depends(get_inventory_service),
) -> List[CategoryRead]:
    return service.list_categories()


@categories_router.post("", response_model=CategoryRead, status_code=status.HTTP_201_CREATED)
def create_category(
    payload: CategoryCreate,
    service: InventoryService = Depends(get_inventory_service),
) -> CategoryRead:
    return service.create_category(payload)


@products_router.get("", response_model=List[ProductRead])
def list_products(
    service: InventoryService = Depends(get_inventory_service),
) -> List[ProductRead]:
    return service.list_products()


@products_router.get("/{product_id}", response_model=ProductRead)
def get_product(
    product_id: int,
    service: InventoryService = Depends(get_inventory_service),
) -> ProductRead:
    return service.get_product(product_id)


@products_router.post("", response_model=ProductRead, status_code=status.HTTP_201_CREATED)
def create_product(
    payload: ProductCreate,
    service: InventoryService = Depends(get_inventory_service),
) -> ProductRead:
    return service.create_product(payload)


@products_router.put("/{product_id}", response_model=ProductRead)
def update_product(
    product_id: int,
    payload: ProductUpdate,
    service: InventoryService = Depends(get_inventory_service),
) -> ProductRead:
    return service.update_product(product_id, payload)


router.include_router(categories_router)
router.include_router(products_router)
