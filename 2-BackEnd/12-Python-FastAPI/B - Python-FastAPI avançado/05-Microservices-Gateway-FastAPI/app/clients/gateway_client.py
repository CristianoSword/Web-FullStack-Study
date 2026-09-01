from typing import Any, Dict, Optional

import httpx
from fastapi import FastAPI
from httpx import ASGITransport

from app.core.exceptions import DownstreamServiceError
from app.core.settings import AppSettings


class GatewayClient:
    def __init__(self, services: Dict[str, FastAPI], settings: AppSettings) -> None:
        self.services = services
        self.settings = settings

    async def request(
        self,
        service_name: str,
        method: str,
        path: str,
        json: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        service_app = self.services[service_name]
        transport = ASGITransport(app=service_app)
        async with httpx.AsyncClient(
            transport=transport,
            base_url=f"http://{service_name}.internal",
            timeout=self.settings.gateway_timeout_seconds,
        ) as client:
            try:
                response = await client.request(method, path, json=json)
                response.raise_for_status()
            except httpx.HTTPStatusError as exc:
                detail = exc.response.json().get("detail", "downstream http error")
                raise DownstreamServiceError(
                    service_name,
                    str(detail),
                    status_code=exc.response.status_code,
                ) from exc
            except httpx.HTTPError as exc:
                raise DownstreamServiceError(service_name, str(exc)) from exc
            return response.json()
