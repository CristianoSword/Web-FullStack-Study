import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from runtime import get_runtime_settings
from security_profile import load_security_profile


runtime = get_runtime_settings()
baseline = load_security_profile()


def send_json(handler, status_code: int, payload: dict) -> None:
    encoded = json.dumps(payload).encode("utf-8")
    handler.send_response(status_code)
    handler.send_header("Content-Type", "application/json")
    handler.send_header("Content-Length", str(len(encoded)))
    handler.end_headers()
    handler.wfile.write(encoded)


class SecurityHandler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:
        if self.path == "/health":
            send_json(
                self,
                200,
                {
                    "status": "ok",
                    "appName": runtime.app_name,
                    "runAs": runtime.app_user,
                },
            )
            return

        if self.path == "/security":
            send_json(
                self,
                200,
                {
                    "runtimeUser": runtime.app_user,
                    "uid": runtime.app_uid,
                    "gid": runtime.app_gid,
                    "writablePaths": runtime.writable_paths,
                    "baseline": baseline,
                },
            )
            return

        if self.path == "/filesystem-check":
            send_json(
                self,
                200,
                {
                    "appDirectoryExists": Path("/app").exists(),
                    "tmpExists": Path("/tmp").exists(),
                    "writeExpectation": {
                        "/app": "blocked by read-only root filesystem",
                        "/tmp": "allowed through tmpfs mount",
                    },
                },
            )
            return

        send_json(self, 404, {"error": "route not found"})

    def log_message(self, format: str, *args) -> None:
        return


if __name__ == "__main__":
    server = ThreadingHTTPServer((runtime.host, runtime.port), SecurityHandler)
    server.serve_forever()
