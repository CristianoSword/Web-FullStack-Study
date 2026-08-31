from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse

from app.core.exceptions import JobNotFoundError


def register_exception_handlers(app: FastAPI) -> None:
    @app.exception_handler(JobNotFoundError)
    async def job_not_found_handler(
        _request: Request,
        exc: JobNotFoundError,
    ) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"detail": str(exc)},
        )
