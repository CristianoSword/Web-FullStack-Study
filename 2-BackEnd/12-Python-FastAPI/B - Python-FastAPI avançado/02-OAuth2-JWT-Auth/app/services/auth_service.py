from typing import Optional

from sqlalchemy.orm import Session

from app.core.exceptions import (
    AuthenticationError,
    DuplicateUserError,
    InactiveUserError,
    PasswordMismatchError,
)
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.auth import LoginResponse, TokenResponse, UserCreate
from app.security.passwords import hash_password, verify_password
from app.security.tokens import create_access_token


class AuthService:
    def __init__(self, session: Session) -> None:
        self.session = session
        self.user_repository = UserRepository(session)

    def register_user(self, payload: UserCreate):
        if payload.password != payload.confirm_password:
            raise PasswordMismatchError()
        if self.user_repository.get_by_username(payload.username):
            raise DuplicateUserError("username", payload.username)
        if self.user_repository.get_by_email(payload.email):
            raise DuplicateUserError("email", payload.email)
        user = self.user_repository.create_user(payload, hash_password(payload.password))
        self.session.commit()
        return user

    def authenticate_user(self, login: str, password: str) -> LoginResponse:
        user = self.user_repository.get_by_login(login.lower())
        if user is None or not verify_password(password, user.password_hash):
            raise AuthenticationError()
        if not user.is_active:
            raise InactiveUserError()
        scopes = [user.role]
        token, expires_in = create_access_token(user.username, scopes)
        return LoginResponse(
            user=user,
            token=TokenResponse(
                access_token=token,
                expires_in=expires_in,
                scope=" ".join(scopes),
            ),
        )

    def get_user_by_username(self, username: str) -> Optional[User]:
        return self.user_repository.get_by_username(username.lower())
