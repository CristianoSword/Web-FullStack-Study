from fastapi import APIRouter, status

from app.models.registration import RegistrationRequest, RegistrationResponse
from app.services.registration_service import RegistrationService

router = APIRouter()
service = RegistrationService()


@router.get("/health")
def healthcheck() -> dict[str, str]:
    return {"status": "ok", "service": "request-body-validation"}


@router.post("/registrations", response_model=RegistrationResponse, status_code=status.HTTP_201_CREATED)
def create_registration(payload: RegistrationRequest) -> RegistrationResponse:
    return service.register(payload)


@router.post("/registrations/preview", response_model=RegistrationResponse)
def preview_registration(payload: RegistrationRequest) -> RegistrationResponse:
    return service.register(payload)
