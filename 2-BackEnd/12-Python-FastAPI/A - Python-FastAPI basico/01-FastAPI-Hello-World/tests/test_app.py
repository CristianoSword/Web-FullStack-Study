from fastapi.testclient import TestClient

from app.core.settings import AppSettings
from app.main import create_app


def build_client() -> TestClient:
    app = create_app(
        AppSettings(
            app_name="FastAPI Hello World",
            app_version="0.1.0-test",
            environment="test",
        )
    )
    return TestClient(app)


def test_root_returns_default_greeting() -> None:
    client = build_client()

    response = client.get("/")

    assert response.status_code == 200
    assert response.json() == {
        "project": "FastAPI Hello World",
        "message": "Welcome to the FastAPI study project",
        "version": "0.1.0-test",
        "target": "developer",
    }


def test_root_supports_custom_name() -> None:
    client = build_client()

    response = client.get("/", params={"name": "Ada"})

    assert response.status_code == 200
    assert response.json()["target"] == "Ada"


def test_healthcheck_reports_service_metadata() -> None:
    client = build_client()

    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "service": "FastAPI Hello World",
        "version": "0.1.0-test",
        "environment": "test",
    }


def test_invalid_name_returns_validation_payload() -> None:
    client = build_client()

    response = client.get("/", params={"name": "A"})

    assert response.status_code == 422
    assert response.json()["detail"] == "Request validation failed"
    assert response.json()["errors"][0]["loc"] == ["query", "name"]
