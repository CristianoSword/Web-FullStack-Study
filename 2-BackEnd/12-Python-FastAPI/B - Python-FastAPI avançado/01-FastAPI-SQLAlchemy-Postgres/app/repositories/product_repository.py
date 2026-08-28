from typing import List, Optional

from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate


class ProductRepository:
    def __init__(self, session: Session) -> None:
        self.session = session

    def list_products(self) -> List[Product]:
        statement = (
            select(Product)
            .options(joinedload(Product.category))
            .order_by(Product.name.asc())
        )
        return list(self.session.scalars(statement).unique())

    def get_product(self, product_id: int) -> Optional[Product]:
        statement = (
            select(Product)
            .options(joinedload(Product.category))
            .where(Product.id == product_id)
        )
        return self.session.scalar(statement)

    def get_by_sku(self, sku: str) -> Optional[Product]:
        statement = select(Product).where(Product.sku == sku)
        return self.session.scalar(statement)

    def create_product(self, payload: ProductCreate) -> Product:
        product = Product(**payload.dict())
        self.session.add(product)
        self.session.flush()
        return self.get_product(product.id)  # type: ignore[arg-type]

    def update_product(self, product: Product, payload: ProductUpdate) -> Product:
        for field, value in payload.dict(exclude_unset=True).items():
            setattr(product, field, value)
        self.session.add(product)
        self.session.flush()
        return self.get_product(product.id)  # type: ignore[arg-type]
