import json
import os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
CONFIG = json.loads((ROOT / "config" / "catalog.json").read_text(encoding="utf-8"))
PORT = int(os.environ.get("APP_PORT", CONFIG["defaultPort"]))
HOST = os.environ.get("APP_HOST", "0.0.0.0")


def send_json(handler, status_code: int, payload: dict) -> None:
    encoded = json.dumps(payload).encode("utf-8")
    handler.send_response(status_code)
    handler.send_header("Content-Type", "application/json")
    handler.send_header("Content-Length", str(len(encoded)))
    handler.end_headers()
    handler.wfile.write(encoded)


class CatalogHandler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:
        if self.path == "/health":
            send_json(self, 200, {"status": "ok", "service": CONFIG["serviceName"], "port": PORT})
            return

        if self.path == "/products":
            send_json(self, 200, {"products": CONFIG["products"]})
            return

        send_json(self, 404, {"error": "route not found"})

    def log_message(self, format: str, *args) -> None:
        return


if __name__ == "__main__":
    server = ThreadingHTTPServer((HOST, PORT), CatalogHandler)
    server.serve_forever()
