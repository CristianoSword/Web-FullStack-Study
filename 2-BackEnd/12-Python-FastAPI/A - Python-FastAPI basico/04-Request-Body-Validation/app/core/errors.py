from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from app.core.exceptions import DisposableEmailError, PasswordMismatchError


def register_exception_handlers(app: FastAPI) -> None:
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

    @app.exception_handler(PasswordMismatchError)
    async def password_mismatch_handler(
        _request: Request,
        exc: PasswordMismatchError,
    ) -> JSONResponse:
        return JSONResponse(status_code=422, content={"detail": str(exc)})

    @app.exception_handler(DisposableEmailError)
    async def disposable_email_handler(
        _request: Request,
        exc: DisposableEmailError,
    ) -> JSONResponse:
        return JSONResponse(status_code=422, content={"detail": str(exc)})
