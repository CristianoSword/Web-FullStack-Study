from fastapi.testclient import TestClient

from app.main import create_app


def build_client() -> TestClient:
    app = create_app()
    return TestClient(app)


def test_gateway_health_aggregates_services() -> None:
    client = build_client()

    response = client.get("/gateway/health")

    assert response.status_code == 200
    assert len(response.json()["services"]) == 3


def test_gateway_lists_catalog_products() -> None:
    client = build_client()

    response = client.get("/gateway/catalog/products")

    assert response.status_code == 200
    assert len(response.json()) == 3
    assert response.json()[0]["sku"] == "KB-001"


def test_gateway_quotes_order_from_multiple_services() -> None:
    client = build_client()

    response = client.post(
        "/gateway/orders/quote",
        json={
            "customer_id": "client-77",
            "postal_code": "01311-001",
            "items": [
                {"sku": "kb-001", "quantity": 1},
                {"sku": "ms-002", "quantity": 2},
            ],
        },
    )

    assert response.status_code == 200
    body = response.json()
    assert body["billing"]["currency"] == "BRL"
    assert body["shipping"]["service_level"] == "priority"
    assert len(body["items"]) == 2


def test_gateway_returns_downstream_not_found() -> None:
    client = build_client()

    response = client.post(
        "/gateway/orders/quote",
        json={
            "customer_id": "client-404",
            "postal_code": "01311-000",
            "items": [{"sku": "missing-999", "quantity": 1}],
        },
    )

    assert response.status_code == 404
    assert response.json()["service"] == "catalog"
