from collections import defaultdict, deque
from datetime import datetime
from typing import Deque, Dict, List
from uuid import uuid4

from fastapi import WebSocket
from starlette.websockets import WebSocketDisconnect

from app.core.exceptions import ChannelNotFoundError
from app.schemas.alerts import (
    AlertEnvelope,
    AlertPublishRequest,
    ChannelOverview,
    ChannelSnapshot,
    ConnectedClientRead,
    WebSocketEvent,
)
from app.services.contracts import ConnectedClient


class AlertHub:
    def __init__(self, history_limit: int = 25) -> None:
        self.history_limit = history_limit
        self._connections: Dict[str, Dict[str, WebSocket]] = defaultdict(dict)
        self._clients: Dict[str, Dict[str, ConnectedClient]] = defaultdict(dict)
        self._history: Dict[str, Deque[AlertEnvelope]] = defaultdict(
            lambda: deque(maxlen=self.history_limit)
        )

    async def connect(self, websocket: WebSocket, channel: str, username: str) -> ConnectedClient:
        await websocket.accept()
        client = ConnectedClient(
            client_id=str(uuid4()),
            username=username,
            channel=channel,
            connected_at=datetime.utcnow(),
        )
        self._connections[channel][client.client_id] = websocket
        self._clients[channel][client.client_id] = client
        await self._broadcast_system_event(channel, "client-joined", client)
        return client

    async def disconnect(self, channel: str, client_id: str) -> None:
        client = self._clients.get(channel, {}).pop(client_id, None)
        self._connections.get(channel, {}).pop(client_id, None)
        if client is not None:
            await self._broadcast_system_event(channel, "client-left", client)
        if not self._connections.get(channel):
            self._connections.pop(channel, None)
            self._clients.pop(channel, None)

    async def publish_alert(self, payload: AlertPublishRequest) -> AlertEnvelope:
        alert = AlertEnvelope(
            id=str(uuid4()),
            channel=payload.channel,
            title=payload.title,
            message=payload.message,
            severity=payload.severity,
            source=payload.source,
            metadata=payload.metadata,
            created_at=datetime.utcnow(),
        )
        self._history[payload.channel].append(alert)
        event = WebSocketEvent(
            event="alert",
            channel=payload.channel,
            payload=alert.dict(),
        )
        await self._broadcast(payload.channel, event)
        return alert

    def list_channels(self) -> List[ChannelOverview]:
        channels = set(self._connections.keys()) | set(self._history.keys())
        overview: List[ChannelOverview] = []
        for channel in sorted(channels):
            history = list(self._history.get(channel, []))
            overview.append(
                ChannelOverview(
                    channel=channel,
                    active_connections=len(self._connections.get(channel, {})),
                    recent_alert_count=len(history),
                    last_alert_at=history[-1].created_at if history else None,
                )
            )
        return overview

    def get_channel_snapshot(self, channel: str) -> ChannelSnapshot:
        clients = list(self._clients.get(channel, {}).values())
        history = list(self._history.get(channel, []))
        if not clients and not history:
            raise ChannelNotFoundError(channel)
        return ChannelSnapshot(
            channel=channel,
            active_connections=len(clients),
            clients=[
                ConnectedClientRead(
                    client_id=client.client_id,
                    username=client.username,
                    channel=client.channel,
                    connected_at=client.connected_at,
                )
                for client in clients
            ],
            recent_alerts=history,
        )

    async def receive_loop(self, websocket: WebSocket, channel: str, client: ConnectedClient) -> None:
        try:
            while True:
                message = await websocket.receive_text()
                event = WebSocketEvent(
                    event="client-message",
                    channel=channel,
                    payload={"client_id": client.client_id, "username": client.username, "message": message},
                )
                await self._broadcast(channel, event)
        except WebSocketDisconnect:
            await self.disconnect(channel, client.client_id)

    async def _broadcast_system_event(
        self,
        channel: str,
        event_name: str,
        client: ConnectedClient,
    ) -> None:
        event = WebSocketEvent(
            event=event_name,
            channel=channel,
            payload={
                "client_id": client.client_id,
                "username": client.username,
                "connected_at": client.connected_at.isoformat(),
            },
        )
        await self._broadcast(channel, event)

    async def _broadcast(self, channel: str, event: WebSocketEvent) -> None:
        disconnected_clients: List[str] = []
        for client_id, websocket in self._connections.get(channel, {}).items():
            try:
                await websocket.send_json(event.dict())
            except RuntimeError:
                disconnected_clients.append(client_id)

        for client_id in disconnected_clients:
            await self.disconnect(channel, client_id)
