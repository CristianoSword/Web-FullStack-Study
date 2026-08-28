from typing import Optional

from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.auth import UserCreate


class UserRepository:
    def __init__(self, session: Session) -> None:
        self.session = session

    def get_by_username(self, username: str) -> Optional[User]:
        statement = select(User).where(User.username == username)
        return self.session.scalar(statement)

    def get_by_email(self, email: str) -> Optional[User]:
        statement = select(User).where(User.email == email)
        return self.session.scalar(statement)

    def get_by_login(self, login: str) -> Optional[User]:
        statement = select(User).where(or_(User.username == login, User.email == login))
        return self.session.scalar(statement)

    def create_user(self, payload: UserCreate, password_hash: str) -> User:
        user = User(
            username=payload.username,
            email=payload.email,
            full_name=payload.full_name,
            password_hash=password_hash,
            role=payload.role,
            is_active=True,
        )
        self.session.add(user)
        self.session.flush()
        self.session.refresh(user)
        return user
