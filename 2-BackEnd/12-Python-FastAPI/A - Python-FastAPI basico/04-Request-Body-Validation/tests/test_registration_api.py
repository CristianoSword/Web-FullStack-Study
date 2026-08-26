from fastapi.testclient import TestClient

from app.core.settings import AppSettings
from app.main import create_app


def build_client() -> TestClient:
    app = create_app(
        AppSettings(
            app_name="FastAPI Request Body Validation",
            app_version="0.1.0-test",
        )
    )
    return TestClient(app)


def valid_payload() -> dict:
    return {
        "full_name": "Ana Carolina",
        "email": "ana@example.com",
        "password": "StrongPass1",
        "confirm_password": "StrongPass1",
        "age": 29,
        "phone": "(11) 99888-7766",
        "newsletter_opt_in": True,
        "company": "Open Study",
        "address": {
            "street": "Rua das Flores, 123",
            "city": "Sao Paulo",
            "state": "SP",
            "postal_code": "01310-100",
        },
    }


def test_registration_accepts_valid_payload() -> None:
    client = build_client()

    response = client.post("/registrations", json=valid_payload())

    assert response.status_code == 201
    assert response.json()["customer_id"].startswith("CUST-")
    assert response.json()["masked_phone"].endswith("7766")


def test_preview_rejects_password_mismatch() -> None:
    client = build_client()
    payload = valid_payload()
    payload["confirm_password"] = "WrongPass1"

    response = client.post("/registrations/preview", json=payload)

    assert response.status_code == 422
    assert "must match" in response.json()["detail"]


def test_registration_rejects_disposable_email() -> None:
    client = build_client()
    payload = valid_payload()
    payload["email"] = "ana@mailinator.com"

    response = client.post("/registrations", json=payload)

    assert response.status_code == 422
    assert "not allowed" in response.json()["detail"]


def test_registration_returns_validation_errors_for_bad_body() -> None:
    client = build_client()
    payload = valid_payload()
    payload["email"] = "invalid-email"
    payload["age"] = 14
    payload["phone"] = "123"
    payload["address"]["postal_code"] = "999"

    response = client.post("/registrations", json=payload)

    assert response.status_code == 422
    assert response.json()["detail"] == "Request validation failed"
    assert len(response.json()["errors"]) >= 3
