class ChannelNotFoundError(Exception):
    def __init__(self, channel: str) -> None:
        super().__init__(f"channel not found: {channel}")
