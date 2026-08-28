from pathlib import Path

from fastapi.testclient import TestClient

from app.db.base import Base
from app.db.session import get_db, get_engine, get_session_factory
from app.main import create_app
from app.models import User  # noqa: F401


def build_client(tmp_path: Path) -> TestClient:
    database_path = tmp_path / "auth.db"
    database_url = f"sqlite+pysqlite:///{database_path.as_posix()}"
    engine = get_engine(database_url)
    Base.metadata.create_all(bind=engine)
    session_factory = get_session_factory(database_url)

    app = create_app()

    def override_db():
        session = session_factory()
        try:
            yield session
        finally:
            session.close()

    app.dependency_overrides[get_db] = override_db
    return TestClient(app)


def register_user(client: TestClient, **overrides) -> dict:
    payload = {
        "username": "study_admin",
        "email": "study@example.com",
        "full_name": "Study Admin",
        "password": "StrongPass123",
        "confirm_password": "StrongPass123",
        "role": "admin",
    }
    payload.update(overrides)
    response = client.post("/auth/register", json=payload)
    assert response.status_code == 201
    return payload


def login_user(client: TestClient, username: str, password: str) -> dict:
    response = client.post(
        "/auth/token",
        data={"username": username, "password": password},
    )
    assert response.status_code == 200
    return response.json()


def test_register_and_login_flow(tmp_path: Path) -> None:
    client = build_client(tmp_path)
    payload = register_user(client)

    token_response = login_user(client, payload["username"], payload["password"])

    assert token_response["token_type"] == "bearer"
    assert token_response["scope"] == "admin"
    assert token_response["expires_in"] == 1800


def test_profile_endpoint_requires_valid_token(tmp_path: Path) -> None:
    client = build_client(tmp_path)
    payload = register_user(client, role="member")
    token_response = login_user(client, payload["email"], payload["password"])

    me_response = client.get(
        "/auth/me",
        headers={"Authorization": f"Bearer {token_response['access_token']}"},
    )

    assert me_response.status_code == 200
    assert me_response.json()["username"] == payload["username"]
    assert me_response.json()["role"] == "member"


def test_duplicate_registration_returns_conflict(tmp_path: Path) -> None:
    client = build_client(tmp_path)
    register_user(client, username="study_member", email="member@example.com", role="member")

    response = client.post(
        "/auth/register",
        json={
            "username": "study_member",
            "email": "member2@example.com",
            "full_name": "Another Member",
            "password": "StrongPass123",
            "confirm_password": "StrongPass123",
            "role": "member",
        },
    )

    assert response.status_code == 409
    assert "username already exists" in response.json()["detail"]


def test_password_mismatch_returns_unprocessable_entity(tmp_path: Path) -> None:
    client = build_client(tmp_path)

    response = client.post(
        "/auth/register",
        json={
            "username": "bad_confirm",
            "email": "bad@example.com",
            "full_name": "Bad Confirm",
            "password": "StrongPass123",
            "confirm_password": "DifferentPass123",
            "role": "member",
        },
    )

    assert response.status_code == 422


def test_admin_scope_is_enforced(tmp_path: Path) -> None:
    client = build_client(tmp_path)
    payload = register_user(client, username="member_user", email="member@example.com", role="member")
    token_response = login_user(client, payload["username"], payload["password"])

    forbidden = client.get(
        "/auth/admin",
        headers={"Authorization": f"Bearer {token_response['access_token']}"},
    )

    assert forbidden.status_code == 403
    assert forbidden.json()["detail"] == "not enough permissions"
