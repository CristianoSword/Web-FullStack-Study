from typing import List

from app.core.exceptions import DuplicateSkuError, ItemNotFoundError
from app.models.item import ItemCreate, ItemRecord, ItemUpdate
from app.repositories.item_repository import ItemRepository


class ItemService:
    def __init__(self, repository: ItemRepository) -> None:
        self.repository = repository

    def list_items(self) -> List[ItemRecord]:
        return self.repository.list_items()

    def get_item(self, item_id: int) -> ItemRecord:
        item = self.repository.get_item(item_id)
        if item is None:
            raise ItemNotFoundError(item_id)
        return item

    def create_item(self, payload: ItemCreate) -> ItemRecord:
        if self.repository.get_by_sku(payload.sku):
            raise DuplicateSkuError(payload.sku)
        return self.repository.create_item(payload)

    def update_item(self, item_id: int, payload: ItemUpdate) -> ItemRecord:
        if self.repository.get_item(item_id) is None:
            raise ItemNotFoundError(item_id)
        updated = self.repository.update_item(item_id, payload)
        if updated is None:
            raise ItemNotFoundError(item_id)
        return updated

    def delete_item(self, item_id: int) -> None:
        if not self.repository.delete_item(item_id):
            raise ItemNotFoundError(item_id)
