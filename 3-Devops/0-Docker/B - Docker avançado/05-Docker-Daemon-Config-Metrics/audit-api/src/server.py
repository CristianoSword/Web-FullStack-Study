import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

from audit_config import get_runtime_settings
from audit_data import load_alerts, load_targets


runtime = get_runtime_settings()
targets = load_targets()
alerts = load_alerts()


def send_json(handler, status_code: int, payload: dict) -> None:
    encoded = json.dumps(payload).encode("utf-8")
    handler.send_response(status_code)
    handler.send_header("Content-Type", "application/json")
    handler.send_header("Content-Length", str(len(encoded)))
    handler.end_headers()
    handler.wfile.write(encoded)


class AuditHandler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:
        if self.path == "/health":
            send_json(self, 200, {"status": "ok", "service": "audit-api", "port": runtime.port})
            return

        if self.path == "/targets":
            send_json(self, 200, targets)
            return

        if self.path == "/alerts":
            send_json(self, 200, alerts)
            return

        send_json(self, 404, {"error": "route not found"})

    def log_message(self, format: str, *args) -> None:
        return


if __name__ == "__main__":
    server = ThreadingHTTPServer((runtime.host, runtime.port), AuditHandler)
    server.serve_forever()
