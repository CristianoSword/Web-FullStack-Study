import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

from release import load_release_notes
from runtime import get_runtime_settings


runtime = get_runtime_settings()
release_notes = load_release_notes()


def send_json(handler, status_code: int, payload: dict) -> None:
    encoded = json.dumps(payload).encode("utf-8")
    handler.send_response(status_code)
    handler.send_header("Content-Type", "application/json")
    handler.send_header("Content-Length", str(len(encoded)))
    handler.end_headers()
    handler.wfile.write(encoded)


class ReleaseHandler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:
        if self.path == "/health":
            send_json(
                self,
                200,
                {
                    "status": "ok",
                    "appName": runtime.app_name,
                    "version": runtime.app_version,
                },
            )
            return

        if self.path == "/image":
            send_json(
                self,
                200,
                {
                    "repository": runtime.image_repository,
                    "versionTag": runtime.app_version,
                    "latestTag": "latest",
                },
            )
            return

        if self.path == "/release":
            send_json(
                self,
                200,
                {
                    "repository": runtime.image_repository,
                    "release": release_notes,
                },
            )
            return

        send_json(self, 404, {"error": "route not found"})

    def log_message(self, format: str, *args) -> None:
        return


if __name__ == "__main__":
    server = ThreadingHTTPServer((runtime.host, runtime.port), ReleaseHandler)
    server.serve_forever()
