class DownstreamServiceError(Exception):
    def __init__(self, service_name: str, detail: str, status_code: int = 502) -> None:
        self.service_name = service_name
        self.status_code = status_code
        super().__init__(f"{service_name} error: {detail}")
