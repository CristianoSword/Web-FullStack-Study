import json
import os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer


APP_NAME = os.environ.get("APP_NAME", "study-container-web")
APP_VERSION = os.environ.get("APP_VERSION", "v1.0.0")
PORT = int(os.environ.get("PORT", "8080"))


def send_json(handler, status_code, payload):
    encoded = json.dumps(payload).encode("utf-8")
    handler.send_response(status_code)
    handler.send_header("Content-Type", "application/json")
    handler.send_header("Content-Length", str(len(encoded)))
    handler.end_headers()
    handler.wfile.write(encoded)


class ContainerHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/health":
            send_json(
                self,
                200,
                {"status": "ok", "appName": APP_NAME, "version": APP_VERSION, "port": PORT},
            )
            return

        if self.path == "/release":
            send_json(
                self,
                200,
                {
                    "image": f"registry.heroku.com/{APP_NAME}/web",
                    "version": APP_VERSION,
                    "processType": "web",
                },
            )
            return

        send_json(self, 404, {"error": "route not found"})

    def log_message(self, format, *args):
        return


if __name__ == "__main__":
    server = ThreadingHTTPServer(("0.0.0.0", PORT), ContainerHandler)
    server.serve_forever()
