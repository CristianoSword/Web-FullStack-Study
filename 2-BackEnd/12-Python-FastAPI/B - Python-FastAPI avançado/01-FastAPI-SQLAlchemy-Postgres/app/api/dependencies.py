from fastapi import Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.services.inventory_service import InventoryService


def get_inventory_service(db: Session = Depends(get_db)) -> InventoryService:
    return InventoryService(db)
