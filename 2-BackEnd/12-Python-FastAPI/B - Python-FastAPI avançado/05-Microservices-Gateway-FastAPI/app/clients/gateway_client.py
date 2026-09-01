from typing import Any, Dict, Optional

import httpx
from fastapi import FastAPI
from httpx import ASGITransport

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
            response = await client.request(method, path, json=json)
            response.raise_for_status()
            return response.json()
