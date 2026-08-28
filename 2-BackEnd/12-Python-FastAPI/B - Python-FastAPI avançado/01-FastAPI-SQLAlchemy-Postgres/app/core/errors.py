from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from app.core.exceptions import DuplicateResourceError, ResourceNotFoundError


def register_exception_handlers(app: FastAPI) -> None:
    @app.exception_handler(DuplicateResourceError)
    async def duplicate_resource_handler(
        _request: Request,
        exc: DuplicateResourceError,
    ) -> JSONResponse:
        return JSONResponse(status_code=409, content={"detail": str(exc)})

    @app.exception_handler(ResourceNotFoundError)
    async def resource_not_found_handler(
        _request: Request,
        exc: ResourceNotFoundError,
    ) -> JSONResponse:
        return JSONResponse(status_code=404, content={"detail": str(exc)})
