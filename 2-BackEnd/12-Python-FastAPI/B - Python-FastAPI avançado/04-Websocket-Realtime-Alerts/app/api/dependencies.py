from fastapi import Request

from app.services.alert_hub import AlertHub


def get_alert_hub(request: Request) -> AlertHub:
    return request.app.state.alert_hub
