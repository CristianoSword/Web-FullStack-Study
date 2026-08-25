class ItemNotFoundError(Exception):
    def __init__(self, item_id: int) -> None:
        super().__init__(f"Item {item_id} was not found")
        self.item_id = item_id


class DuplicateSkuError(Exception):
    def __init__(self, sku: str) -> None:
        super().__init__(f"Item with SKU {sku} already exists")
        self.sku = sku
