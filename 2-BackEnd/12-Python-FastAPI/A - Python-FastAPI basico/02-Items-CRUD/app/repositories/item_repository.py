from typing import List, Optional, Protocol

from app.models.item import ItemCreate, ItemRecord, ItemUpdate


class ItemRepository(Protocol):
    def list_items(self) -> List[ItemRecord]:
        ...

    def get_item(self, item_id: int) -> Optional[ItemRecord]:
        ...

    def get_by_sku(self, sku: str) -> Optional[ItemRecord]:
        ...

    def create_item(self, payload: ItemCreate) -> ItemRecord:
        ...

    def update_item(self, item_id: int, payload: ItemUpdate) -> Optional[ItemRecord]:
        ...

    def delete_item(self, item_id: int) -> bool:
        ...
