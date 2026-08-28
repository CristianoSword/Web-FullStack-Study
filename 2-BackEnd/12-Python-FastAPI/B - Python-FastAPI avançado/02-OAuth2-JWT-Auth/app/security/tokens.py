from datetime import datetime, timedelta, timezone
from typing import List

import jwt

from app.core.settings import AppSettings


def create_access_token(subject: str, scopes: List[str]) -> tuple[str, int]:
    settings = AppSettings()
    expires_in = settings.jwt_access_token_expire_minutes * 60
    expires_at = datetime.now(timezone.utc) + timedelta(seconds=expires_in)
    payload = {
        "sub": subject,
        "scopes": scopes,
        "exp": expires_at,
    }
    token = jwt.encode(payload, settings.jwt_secret_key, algorithm="HS256")
    return token, expires_in


def decode_access_token(token: str) -> dict:
    settings = AppSettings()
    return jwt.decode(token, settings.jwt_secret_key, algorithms=["HS256"])
