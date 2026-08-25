from fastapi import Request

from app.services.item_service import ItemService


def get_item_service(request: Request) -> ItemService:
    return request.app.state.item_service
