from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from app.core.exceptions import DownstreamServiceError


def register_exception_handlers(app: FastAPI) -> None:
    @app.exception_handler(DownstreamServiceError)
    async def downstream_service_error_handler(
        _request: Request,
        exc: DownstreamServiceError,
    ) -> JSONResponse:
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": str(exc), "service": exc.service_name},
        )
