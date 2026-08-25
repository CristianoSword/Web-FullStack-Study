from fastapi.testclient import TestClient

from app.core.settings import AppSettings
from app.main import create_app


def build_client() -> TestClient:
    app = create_app(
        AppSettings(
            app_name="FastAPI Items CRUD",
            app_version="0.1.0-test",
        )
    )
    return TestClient(app)


def test_create_and_list_items() -> None:
    client = build_client()

    created = client.post(
        "/items",
        json={
            "name": "Mechanical Keyboard",
            "sku": "kb-001",
            "description": "Wireless keyboard",
            "price": "499.90",
            "quantity": 8,
        },
    )
    listed = client.get("/items")

    assert created.status_code == 201
    assert created.json()["sku"] == "KB-001"
    assert listed.status_code == 200
    assert len(listed.json()) == 1


def test_get_update_and_delete_item() -> None:
    client = build_client()
    created = client.post(
        "/items",
        json={
            "name": "USB-C Dock",
            "sku": "dock-001",
            "description": "Dock station",
            "price": "899.00",
            "quantity": 3,
        },
    )
    item_id = created.json()["id"]

    fetched = client.get(f"/items/{item_id}")
    updated = client.put(
        f"/items/{item_id}",
        json={"quantity": 5, "description": "Dock station with HDMI"},
    )
    deleted = client.delete(f"/items/{item_id}")
    missing = client.get(f"/items/{item_id}")

    assert fetched.status_code == 200
    assert updated.status_code == 200
    assert updated.json()["quantity"] == 5
    assert deleted.status_code == 204
    assert missing.status_code == 404


def test_duplicate_sku_returns_conflict() -> None:
    client = build_client()
    payload = {
        "name": "Gaming Mouse",
        "sku": "mouse-001",
        "description": "High precision mouse",
        "price": "299.50",
        "quantity": 10,
    }

    first = client.post("/items", json=payload)
    second = client.post("/items", json=payload)

    assert first.status_code == 201
    assert second.status_code == 409
    assert "SKU MOUSE-001 already exists" in second.json()["detail"]


def test_validation_payload_is_returned() -> None:
    client = build_client()

    response = client.post(
        "/items",
        json={
            "name": "TV",
            "sku": "tv",
            "description": "x",
            "price": "-10",
            "quantity": -1,
        },
    )

    assert response.status_code == 422
    assert response.json()["detail"] == "Request validation failed"
    assert len(response.json()["errors"]) >= 2
