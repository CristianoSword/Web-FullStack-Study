import json
import os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.error import URLError
from urllib.request import urlopen


ROOT = Path(__file__).resolve().parents[2]
CONFIG = json.loads((ROOT / "config" / "gateway.json").read_text(encoding="utf-8"))
PORT = int(os.environ.get("APP_PORT", CONFIG["defaultPort"]))
HOST = os.environ.get("APP_HOST", "0.0.0.0")
CATALOG_BASE_URL = os.environ.get("CATALOG_BASE_URL", CONFIG["catalogTarget"])


def send_json(handler, status_code: int, payload: dict) -> None:
    encoded = json.dumps(payload).encode("utf-8")
    handler.send_response(status_code)
    handler.send_header("Content-Type", "application/json")
    handler.send_header("Content-Length", str(len(encoded)))
    handler.end_headers()
    handler.wfile.write(encoded)


class GatewayHandler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:
        if self.path == "/health":
            send_json(self, 200, {"status": "ok", "service": CONFIG["serviceName"], "port": PORT})
            return

        if self.path == "/catalog":
            try:
                payload = fetch_catalog_payload()
            except RuntimeError as error:
                send_json(self, 502, {"error": str(error)})
                return
            send_json(self, 200, payload)
            return

        if self.path == "/network":
            send_json(
                self,
                200,
                {
                    "network": "inventory_bridge",
                    "catalogBaseUrl": CATALOG_BASE_URL,
                    "resolutionExample": "http://catalog-service:3031/products",
                },
            )
            return

        send_json(self, 404, {"error": "route not found"})

    def log_message(self, format: str, *args) -> None:
        return


def fetch_catalog_payload() -> dict:
    try:
        with urlopen(f"{CATALOG_BASE_URL}/products", timeout=3) as response:
            return json.loads(response.read().decode("utf-8"))
    except URLError as error:
        raise RuntimeError(f"could not reach catalog-service over bridge network: {error}") from error


if __name__ == "__main__":
    server = ThreadingHTTPServer((HOST, PORT), GatewayHandler)
    server.serve_forever()
