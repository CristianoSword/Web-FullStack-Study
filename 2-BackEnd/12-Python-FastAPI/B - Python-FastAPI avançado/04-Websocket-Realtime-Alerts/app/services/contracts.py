from dataclasses import dataclass
from datetime import datetime


@dataclass
class ConnectedClient:
    client_id: str
    username: str
    channel: str
    connected_at: datetime
