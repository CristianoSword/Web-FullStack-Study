from fastapi import APIRouter, Depends, Security, status
from fastapi.security import OAuth2PasswordRequestForm

from app.api.dependencies import get_auth_service, get_current_admin, get_current_user
from app.models.user import User
from app.schemas.auth import (
    LoginResponse,
    MessageResponse,
    TokenResponse,
    UserCreate,
    UserRead,
)
from app.services.auth_service import AuthService

router = APIRouter()
auth_router = APIRouter(prefix="/auth", tags=["auth"])


@router.get("/health")
def healthcheck() -> dict[str, str]:
    return {"status": "ok", "service": "oauth2-jwt-auth"}


@auth_router.post(
    "/register",
    response_model=UserRead,
    status_code=status.HTTP_201_CREATED,
)
def register_user(
    payload: UserCreate,
    auth_service: AuthService = Depends(get_auth_service),
) -> UserRead:
    user = auth_service.register_user(payload)
    return UserRead.from_orm(user)


@auth_router.post("/token", response_model=TokenResponse)
def issue_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    auth_service: AuthService = Depends(get_auth_service),
) -> TokenResponse:
    response = auth_service.authenticate_user(form_data.username, form_data.password)
    return response.token


@auth_router.get("/me", response_model=UserRead)
def get_profile(current_user: User = Security(get_current_user)) -> UserRead:
    return UserRead.from_orm(current_user)


@auth_router.get("/admin", response_model=MessageResponse)
def get_admin_panel(_current_user: User = Depends(get_current_admin)) -> MessageResponse:
    return MessageResponse(detail="admin access granted")


router.include_router(auth_router)
