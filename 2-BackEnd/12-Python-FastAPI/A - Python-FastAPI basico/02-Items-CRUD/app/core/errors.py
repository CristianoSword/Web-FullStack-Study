from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from app.core.exceptions import DuplicateSkuError, ItemNotFoundError


def register_exception_handlers(app: FastAPI) -> None:
    @app.exception_handler(ItemNotFoundError)
    async def item_not_found_handler(
        _request: Request,
        exc: ItemNotFoundError,
    ) -> JSONResponse:
        return JSONResponse(status_code=404, content={"detail": str(exc)})

    @app.exception_handler(DuplicateSkuError)
    async def duplicate_sku_handler(
        _request: Request,
        exc: DuplicateSkuError,
    ) -> JSONResponse:
        return JSONResponse(status_code=409, content={"detail": str(exc)})

    @app.exception_handler(RequestValidationError)
    async def request_validation_handler(
        _request: Request,
        exc: RequestValidationError,
    ) -> JSONResponse:
        return JSONResponse(
            status_code=422,
            content={
                "detail": "Request validation failed",
                "errors": exc.errors(),
            },
        )
