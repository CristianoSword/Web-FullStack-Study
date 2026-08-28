from typing import List, Optional

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.category import Category
from app.schemas.category import CategoryCreate


class CategoryRepository:
    def __init__(self, session: Session) -> None:
        self.session = session

    def list_categories(self) -> List[Category]:
        statement = select(Category).order_by(Category.name.asc())
        return list(self.session.scalars(statement))

    def get_category(self, category_id: int) -> Optional[Category]:
        return self.session.get(Category, category_id)

    def get_by_slug(self, slug: str) -> Optional[Category]:
        statement = select(Category).where(Category.slug == slug)
        return self.session.scalar(statement)

    def create_category(self, payload: CategoryCreate) -> Category:
        category = Category(**payload.dict())
        self.session.add(category)
        self.session.flush()
        self.session.refresh(category)
        return category
