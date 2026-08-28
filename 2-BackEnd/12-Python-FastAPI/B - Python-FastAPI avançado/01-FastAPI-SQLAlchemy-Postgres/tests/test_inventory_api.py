from pathlib import Path

from fastapi.testclient import TestClient

from app.db.base import Base
from app.db.session import get_engine, get_session_factory, get_db
from app.main import create_app
from app.models import Category, Product  # noqa: F401


def build_client(tmp_path: Path) -> TestClient:
    database_path = tmp_path / "inventory.db"
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


def test_create_category_and_product(tmp_path: Path) -> None:
    client = build_client(tmp_path)

    category_response = client.post(
        "/categories",
        json={"name": "Peripherals", "slug": "peripherals"},
    )
    product_response = client.post(
        "/products",
        json={
            "name": "Mechanical Keyboard",
            "sku": "kb-001",
            "description": "Wireless keyboard",
            "price": "499.90",
            "stock": 7,
            "category_id": category_response.json()["id"],
        },
    )

    assert category_response.status_code == 201
    assert product_response.status_code == 201
    assert product_response.json()["sku"] == "KB-001"
    assert product_response.json()["category"]["slug"] == "peripherals"


def test_list_and_get_products(tmp_path: Path) -> None:
    client = build_client(tmp_path)
    category = client.post("/categories", json={"name": "Audio", "slug": "audio"})
    created = client.post(
        "/products",
        json={
            "name": "Studio Headphones",
            "sku": "hd-001",
            "description": "Closed-back reference headphones",
            "price": "899.00",
            "stock": 4,
            "category_id": category.json()["id"],
        },
    )
    product_id = created.json()["id"]

    listed = client.get("/products")
    fetched = client.get(f"/products/{product_id}")

    assert listed.status_code == 200
    assert len(listed.json()) == 1
    assert fetched.status_code == 200
    assert fetched.json()["name"] == "Studio Headphones"


def test_duplicate_category_slug_returns_conflict(tmp_path: Path) -> None:
    client = build_client(tmp_path)
    payload = {"name": "Networking", "slug": "networking"}

    first = client.post("/categories", json=payload)
    second = client.post("/categories", json=payload)

    assert first.status_code == 201
    assert second.status_code == 409


def test_missing_category_returns_not_found(tmp_path: Path) -> None:
    client = build_client(tmp_path)

    response = client.post(
        "/products",
        json={
            "name": "USB-C Dock",
            "sku": "dock-001",
            "description": "Multiport dock",
            "price": "699.00",
            "stock": 2,
            "category_id": 999,
        },
    )

    assert response.status_code == 404
