import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse

from database import DatabaseContext
from repository import InventoryRepository
from responses import send_json
from runtime import get_runtime_settings


runtime = get_runtime_settings()
database = DatabaseContext(runtime.database_path)
database.initialize()
repository = InventoryRepository(database, runtime.seed_file)


class InventoryHandler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:
        parsed = urlparse(self.path)

        if parsed.path == "/health":
            send_json(
                self,
                200,
                {
                    "status": "ok",
                    "service": runtime.service_name,
                    "port": runtime.port,
                    "databasePath": runtime.database_path,
                    "dataDirectory": runtime.data_dir,
                },
            )
            return

        if parsed.path == "/items":
            send_json(self, 200, {"items": repository.list_items()})
            return

        if parsed.path == "/volumes":
            send_json(self, 200, repository.describe_volume_state(runtime.data_dir))
            return

        send_json(self, 404, {"error": "route not found"})

    def do_POST(self) -> None:
        parsed = urlparse(self.path)
        body = self._read_json_body()
        if isinstance(body, tuple):
            status, payload = body
            send_json(self, status, payload)
            return

        if parsed.path == "/items":
            try:
                item = repository.create_item(body)
            except ValueError as error:
                send_json(self, 422, {"error": str(error)})
                return
            send_json(self, 201, {"item": item})
            return

        if parsed.path == "/seed":
            result = repository.seed_defaults()
            send_json(self, 201, result)
            return

        send_json(self, 404, {"error": "route not found"})

    def do_DELETE(self) -> None:
        parsed = urlparse(self.path)
        if not parsed.path.startswith("/items/"):
            send_json(self, 404, {"error": "route not found"})
            return

        item_id = parsed.path.split("/")[-1]
        if not item_id.isdigit():
            send_json(self, 422, {"error": "item id must be numeric"})
            return

        removed = repository.delete_item(int(item_id))
        if not removed:
            send_json(self, 404, {"error": "item not found"})
            return

        send_json(self, 200, {"deleted": True, "itemId": int(item_id)})

    def log_message(self, format: str, *args) -> None:
        return

    def _read_json_body(self):
        content_length = int(self.headers.get("Content-Length", "0"))
        if content_length <= 0:
            return 422, {"error": "request body is required"}

        raw_body = self.rfile.read(content_length)
        try:
            return json.loads(raw_body.decode("utf-8"))
        except json.JSONDecodeError:
            return 400, {"error": "invalid json payload"}


if __name__ == "__main__":
    server = ThreadingHTTPServer((runtime.host, runtime.port), InventoryHandler)
    server.serve_forever()
