from datetime import datetime
from enum import Enum
from typing import Dict, List, Optional

from pydantic import BaseModel, Field, validator


class AlertSeverity(str, Enum):
    info = "info"
    warning = "warning"
    critical = "critical"


class AlertPublishRequest(BaseModel):
    channel: str = Field(..., min_length=3, max_length=50)
    title: str = Field(..., min_length=3, max_length=80)
    message: str = Field(..., min_length=5, max_length=280)
    severity: AlertSeverity = AlertSeverity.info
    source: str = Field(..., min_length=3, max_length=40)
    metadata: Dict[str, str] = Field(default_factory=dict)

    @validator("channel", "source")
    def normalize_slug_fields(cls, value: str) -> str:
        cleaned = value.strip().lower().replace(" ", "-")
        if not cleaned:
            raise ValueError("field cannot be blank")
        return cleaned

    @validator("title", "message")
    def normalize_text_fields(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("field cannot be blank")
        return cleaned


class AlertEnvelope(BaseModel):
    id: str
    channel: str
    title: str
    message: str
    severity: AlertSeverity
    source: str
    metadata: Dict[str, str] = Field(default_factory=dict)
    created_at: datetime


class ConnectedClientRead(BaseModel):
    client_id: str
    username: str
    channel: str
    connected_at: datetime


class ChannelSnapshot(BaseModel):
    channel: str
    active_connections: int
    clients: List[ConnectedClientRead]
    recent_alerts: List[AlertEnvelope]


class WebSocketJoinRequest(BaseModel):
    username: str = Field(..., min_length=3, max_length=30)

    @validator("username")
    def normalize_username(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("username cannot be blank")
        return cleaned


class WebSocketEvent(BaseModel):
    event: str
    channel: str
    payload: Dict[str, object]


class ChannelOverview(BaseModel):
    channel: str
    active_connections: int
    recent_alert_count: int
    last_alert_at: Optional[datetime] = None
