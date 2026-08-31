from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse

from app.core.exceptions import ChannelNotFoundError


def register_exception_handlers(app: FastAPI) -> None:
    @app.exception_handler(ChannelNotFoundError)
    async def channel_not_found_handler(
        _request: Request,
        exc: ChannelNotFoundError,
    ) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"detail": str(exc)},
        )
