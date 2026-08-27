from fastapi.testclient import TestClient

from app.core.settings import AppSettings
from app.main import create_app


def build_client() -> TestClient:
    app = create_app(
        AppSettings(
            app_name="FastAPI Static Files Router",
            app_version="0.1.0-test",
        )
    )
    return TestClient(app)


def test_home_page_renders_html() -> None:
    client = build_client()

    response = client.get("/")

    assert response.status_code == 200
    assert "Static pages served by FastAPI" in response.text
    assert "text/html" in response.headers["content-type"]


def test_about_page_renders_html() -> None:
    client = build_client()

    response = client.get("/about")

    assert response.status_code == 200
    assert "About the study project" in response.text


def test_stylesheet_is_served() -> None:
    client = build_client()

    response = client.get("/static/site.css")

    assert response.status_code == 200
    assert "--accent" in response.text
    assert "text/css" in response.headers["content-type"]


def test_unknown_page_returns_custom_404() -> None:
    client = build_client()

    response = client.get("/missing")

    assert response.status_code == 404
    assert "Page not found" in response.text
