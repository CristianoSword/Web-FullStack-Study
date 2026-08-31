from pathlib import Path
from typing import List

from fastapi import APIRouter, Depends, Query, Request, WebSocket
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from app.api.dependencies import get_alert_hub
from app.schemas.alerts import AlertPublishRequest, ChannelOverview, ChannelSnapshot
from app.services.alert_hub import AlertHub

router = APIRouter()
templates = Jinja2Templates(directory=str(Path(__file__).resolve().parents[1] / "templates"))


@router.get("/health")
def healthcheck() -> dict[str, str]:
    return {"status": "ok", "service": "realtime-alerts"}


@router.get("/", response_class=HTMLResponse)
def dashboard(request: Request):
    return templates.TemplateResponse("dashboard.html", {"request": request})


@router.post("/alerts", response_model=dict)
async def publish_alert(
    payload: AlertPublishRequest,
    alert_hub: AlertHub = Depends(get_alert_hub),
) -> dict:
    alert = await alert_hub.publish_alert(payload)
    return {"status": "sent", "alert": alert.dict()}


@router.get("/channels", response_model=List[ChannelOverview])
def list_channels(alert_hub: AlertHub = Depends(get_alert_hub)) -> List[ChannelOverview]:
    return alert_hub.list_channels()


@router.get("/channels/{channel}", response_model=ChannelSnapshot)
def get_channel_snapshot(
    channel: str,
    alert_hub: AlertHub = Depends(get_alert_hub),
) -> ChannelSnapshot:
    return alert_hub.get_channel_snapshot(channel)


@router.websocket("/ws/{channel}")
async def websocket_alerts(
    websocket: WebSocket,
    channel: str,
    username: str = Query(..., min_length=3, max_length=30),
) -> None:
    alert_hub: AlertHub = websocket.app.state.alert_hub
    client = await alert_hub.connect(websocket, channel.strip().lower(), username.strip())
    snapshot = alert_hub.get_channel_snapshot(client.channel)
    await websocket.send_json({"event": "snapshot", "channel": client.channel, "payload": snapshot.dict()})
    await alert_hub.receive_loop(websocket, client.channel, client)
