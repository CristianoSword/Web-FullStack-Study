from typing import List

from fastapi import APIRouter, Depends, Response, status

from app.api.dependencies import get_item_service
from app.models.item import ItemCreate, ItemRecord, ItemUpdate
from app.services.item_service import ItemService

router = APIRouter()
items_router = APIRouter(prefix="/items", tags=["items"])

@router.get("/health")
def healthcheck() -> dict[str, str]:
    return {"status": "ok", "service": "items-crud"}


@items_router.get("", response_model=List[ItemRecord])
def list_items(service: ItemService = Depends(get_item_service)) -> List[ItemRecord]:
    return service.list_items()


@items_router.post("", response_model=ItemRecord, status_code=status.HTTP_201_CREATED)
def create_item(
    payload: ItemCreate,
    service: ItemService = Depends(get_item_service),
) -> ItemRecord:
    return service.create_item(payload)


@items_router.get("/{item_id}", response_model=ItemRecord)
def get_item(
    item_id: int,
    service: ItemService = Depends(get_item_service),
) -> ItemRecord:
    return service.get_item(item_id)


@items_router.put("/{item_id}", response_model=ItemRecord)
def update_item(
    item_id: int,
    payload: ItemUpdate,
    service: ItemService = Depends(get_item_service),
) -> ItemRecord:
    return service.update_item(item_id, payload)


@items_router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_item(
    item_id: int,
    service: ItemService = Depends(get_item_service),
) -> Response:
    service.delete_item(item_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


router.include_router(items_router)
