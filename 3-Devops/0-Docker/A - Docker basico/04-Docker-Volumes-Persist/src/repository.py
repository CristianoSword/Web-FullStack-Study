import json
from datetime import datetime, timezone
from pathlib import Path


class InventoryRepository:
    def __init__(self, database, seed_file: str) -> None:
        self.database = database
        self.seed_file = Path(seed_file)
        self.volume_profile_file = self.seed_file.parent.parent / "models" / "volume-profile.json"

    def list_items(self) -> list[dict]:
        with self.database.connect() as connection:
            rows = connection.execute(
                "SELECT id, sku, name, quantity, location, created_at FROM inventory_items ORDER BY id"
            ).fetchall()
        return [dict(row) for row in rows]

    def create_item(self, payload: dict) -> dict:
        sku = str(payload.get("sku", "")).strip().upper()
        name = str(payload.get("name", "")).strip()
        quantity = payload.get("quantity")
        location = str(payload.get("location", "")).strip().lower()

        if len(sku) < 3:
            raise ValueError("sku must have at least 3 characters")
        if len(name) < 2:
            raise ValueError("name must have at least 2 characters")
        if not isinstance(quantity, int) or quantity < 0:
            raise ValueError("quantity must be a non-negative integer")
        if len(location) < 2:
            raise ValueError("location must have at least 2 characters")

        created_at = datetime.now(timezone.utc).isoformat()

        try:
            with self.database.connect() as connection:
                cursor = connection.execute(
                    """
                    INSERT INTO inventory_items (sku, name, quantity, location, created_at)
                    VALUES (?, ?, ?, ?, ?)
                    """,
                    (sku, name, quantity, location, created_at),
                )
                item_id = cursor.lastrowid
        except Exception as error:
            raise ValueError(f"could not save item: {error}") from error

        return {
            "id": item_id,
            "sku": sku,
            "name": name,
            "quantity": quantity,
            "location": location,
            "created_at": created_at,
        }

    def delete_item(self, item_id: int) -> bool:
        with self.database.connect() as connection:
            cursor = connection.execute("DELETE FROM inventory_items WHERE id = ?", (item_id,))
            return cursor.rowcount > 0

    def seed_defaults(self) -> dict:
        payload = json.loads(self.seed_file.read_text(encoding="utf-8"))
        inserted = 0
        skipped = 0

        for item in payload:
            try:
                self.create_item(item)
                inserted += 1
            except ValueError:
                skipped += 1

        return {"inserted": inserted, "skipped": skipped, "total": len(payload)}

    def describe_volume_state(self, data_dir: str) -> dict:
        profile = json.loads(self.volume_profile_file.read_text(encoding="utf-8"))
        database_exists = self.database.database_path.exists()
        return {
            "dataDirectory": data_dir,
            "databaseExists": database_exists,
            "databasePath": str(self.database.database_path),
            "databaseSizeBytes": self.database.database_path.stat().st_size if database_exists else 0,
            "currentItems": len(self.list_items()),
            "strategies": profile["strategies"],
        }
