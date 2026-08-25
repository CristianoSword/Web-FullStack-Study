from datetime import datetime, timezone
from typing import Dict, List, Optional

from app.models.item import ItemCreate, ItemRecord, ItemUpdate
from app.repositories.item_repository import ItemRepository


class MemoryItemRepository(ItemRepository):
    def __init__(self) -> None:
        self._items: Dict[int, ItemRecord] = {}
        self._next_id = 1

    def list_items(self) -> List[ItemRecord]:
        return sorted(self._items.values(), key=lambda item: item.id)

    def get_item(self, item_id: int) -> Optional[ItemRecord]:
        return self._items.get(item_id)

    def get_by_sku(self, sku: str) -> Optional[ItemRecord]:
        normalized = sku.upper().replace(" ", "-")
        for item in self._items.values():
            if item.sku == normalized:
                return item
        return None

    def create_item(self, payload: ItemCreate) -> ItemRecord:
        now = datetime.now(timezone.utc)
        item = ItemRecord(
            id=self._next_id,
            created_at=now,
            updated_at=now,
            **payload.dict(),
        )
        self._items[item.id] = item
        self._next_id += 1
        return item

    def update_item(self, item_id: int, payload: ItemUpdate) -> Optional[ItemRecord]:
        current = self._items.get(item_id)
        if current is None:
            return None
        updated = current.copy(
            update={
                **payload.dict(exclude_unset=True),
                "updated_at": datetime.now(timezone.utc),
            }
        )
        self._items[item_id] = updated
        return updated

    def delete_item(self, item_id: int) -> bool:
        removed = self._items.pop(item_id, None)
        return removed is not None
