from typing import List

from sqlalchemy.orm import Session

from app.core.exceptions import DuplicateResourceError, ResourceNotFoundError
from app.repositories.category_repository import CategoryRepository
from app.repositories.product_repository import ProductRepository
from app.schemas.category import CategoryCreate
from app.schemas.product import ProductCreate, ProductUpdate


class InventoryService:
    def __init__(self, session: Session) -> None:
        self.session = session
        self.category_repository = CategoryRepository(session)
        self.product_repository = ProductRepository(session)

    def list_categories(self):
        return self.category_repository.list_categories()

    def create_category(self, payload: CategoryCreate):
        if self.category_repository.get_by_slug(payload.slug):
            raise DuplicateResourceError("category slug", payload.slug)
        category = self.category_repository.create_category(payload)
        self.session.commit()
        return category

    def list_products(self):
        return self.product_repository.list_products()

    def get_product(self, product_id: int):
        product = self.product_repository.get_product(product_id)
        if product is None:
            raise ResourceNotFoundError("product", product_id)
        return product

    def create_product(self, payload: ProductCreate):
        if self.product_repository.get_by_sku(payload.sku):
            raise DuplicateResourceError("product sku", payload.sku)
        if self.category_repository.get_category(payload.category_id) is None:
            raise ResourceNotFoundError("category", payload.category_id)
        product = self.product_repository.create_product(payload)
        self.session.commit()
        return product

    def update_product(self, product_id: int, payload: ProductUpdate):
        product = self.product_repository.get_product(product_id)
        if product is None:
            raise ResourceNotFoundError("product", product_id)
        if payload.category_id is not None and self.category_repository.get_category(payload.category_id) is None:
            raise ResourceNotFoundError("category", payload.category_id)
        updated = self.product_repository.update_product(product, payload)
        self.session.commit()
        return updated
