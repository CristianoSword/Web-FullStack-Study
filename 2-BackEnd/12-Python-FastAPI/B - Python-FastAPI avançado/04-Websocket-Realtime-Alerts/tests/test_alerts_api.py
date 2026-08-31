from fastapi.testclient import TestClient

from app.main import create_app


def build_client() -> TestClient:
    app = create_app()
    return TestClient(app)


def test_dashboard_and_publish_alert_flow() -> None:
    client = build_client()

    dashboard = client.get("/")
    publish = client.post(
        "/alerts",
        json={
            "channel": "operations",
            "title": "Latency spike",
            "message": "Average latency crossed 450ms in the payment cluster.",
            "severity": "warning",
            "source": "monitoring bot",
            "metadata": {"region": "sa-east-1"},
        },
    )
    channels = client.get("/channels")
    snapshot = client.get("/channels/operations")

    assert dashboard.status_code == 200
    assert publish.status_code == 200
    assert publish.json()["alert"]["severity"] == "warning"
    assert channels.status_code == 200
    assert channels.json()[0]["recent_alert_count"] == 1
    assert snapshot.status_code == 200
    assert snapshot.json()["recent_alerts"][0]["title"] == "Latency spike"


def test_websocket_receives_snapshot_and_alert() -> None:
    client = build_client()

    with client.websocket_connect("/ws/operations?username=operator-01") as websocket:
        snapshot_event = websocket.receive_json()

        publish = client.post(
            "/alerts",
            json={
                "channel": "operations",
                "title": "Disk pressure",
                "message": "Node storage is above 92 percent.",
                "severity": "critical",
                "source": "autoscaler",
                "metadata": {"node": "worker-03"},
            },
        )
        alert_event = websocket.receive_json()

    assert snapshot_event["event"] == "snapshot"
    assert snapshot_event["channel"] == "operations"
    assert publish.status_code == 200
    assert alert_event["event"] == "alert"
    assert alert_event["payload"]["title"] == "Disk pressure"
    assert alert_event["payload"]["severity"] == "critical"


def test_missing_channel_returns_not_found() -> None:
    client = build_client()

    response = client.get("/channels/ghost-room")

    assert response.status_code == 404


def test_rejects_invalid_alert_payload() -> None:
    client = build_client()

    response = client.post(
        "/alerts",
        json={
            "channel": "  ",
            "title": "No",
            "message": "bad",
            "severity": "warning",
            "source": "x",
            "metadata": {},
        },
    )

    assert response.status_code == 422
