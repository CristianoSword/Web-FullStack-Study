from fastapi.testclient import TestClient

from app.core.settings import AppSettings
from app.main import create_app


def build_client() -> TestClient:
    app = create_app(
        AppSettings(
            app_name="FastAPI Query Path Params",
            app_version="0.1.0-test",
        )
    )
    return TestClient(app)


def test_search_uses_query_params() -> None:
    client = build_client()

    response = client.get(
        "/products/search",
        params={"term": "wireless", "tag": "wireless", "limit": 5},
    )

    assert response.status_code == 200
    assert response.json()["total"] == 1
    assert len(response.json()["items"]) == 1


def test_path_params_return_single_item() -> None:
    client = build_client()

    response = client.get("/categories/audio/products/wireless-headphones")

    assert response.status_code == 200
    assert response.json()["name"] == "Wireless Headphones"


def test_missing_path_item_returns_404() -> None:
    client = build_client()

    response = client.get("/categories/audio/products/unknown-item")

    assert response.status_code == 404
    assert "audio/unknown-item" in response.json()["detail"]


def test_invalid_price_range_returns_validation_payload() -> None:
    client = build_client()

    response = client.get(
        "/products/search",
        params={"min_price": "1000", "max_price": "100"},
    )

    assert response.status_code == 422
    assert response.json()["detail"] == "Request validation failed"
