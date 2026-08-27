from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse

from app.core.exceptions import AssetValidationError


def register_exception_handlers(app: FastAPI) -> None:
    @app.exception_handler(404)
    async def not_found_handler(_request: Request, _exc: Exception) -> HTMLResponse:
        return HTMLResponse(
            content=(
                "<html><body><h1>Page not found</h1>"
                "<p>The requested page does not exist in this study project.</p></body></html>"
            ),
            status_code=404,
        )

    @app.exception_handler(AssetValidationError)
    async def asset_validation_handler(
        _request: Request,
        exc: AssetValidationError,
    ) -> HTMLResponse:
        return HTMLResponse(
            content=f"<html><body><h1>{exc}</h1></body></html>",
            status_code=500,
        )
