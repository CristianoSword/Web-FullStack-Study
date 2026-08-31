import os
from pathlib import Path

os.environ["CELERY_TASK_ALWAYS_EAGER"] = "true"

from fastapi.testclient import TestClient

from app.core.settings import AppSettings
from app.db.base import Base
from app.db.session import get_engine
from app.main import create_app
from app.models import Job  # noqa: F401


def build_client(tmp_path: Path) -> TestClient:
    database_path = tmp_path / "jobs.db"
    database_url = f"sqlite+pysqlite:///{database_path.as_posix()}"
    os.environ["DATABASE_URL"] = database_url
    engine = get_engine(database_url)
    Base.metadata.create_all(bind=engine)
    settings = AppSettings(
        database_url=database_url,
        celery_task_always_eager=True,
    )
    app = create_app(settings)
    return TestClient(app)


def queue_job(client: TestClient, numbers: list[int], task_name: str = "distribution") -> dict:
    response = client.post(
        "/jobs/analytics",
        json={
            "task_name": task_name,
            "numbers": numbers,
            "bucket_size": 10,
        },
    )
    assert response.status_code == 202
    return response.json()


def test_queue_job_and_fetch_completed_result(tmp_path: Path) -> None:
    client = build_client(tmp_path)

    queued = queue_job(client, [3, 5, 8, 13, 21, 34], task_name="prime-scan")
    fetched = client.get(f"/jobs/{queued['job_id']}")

    assert queued["status"] == "queued"
    assert fetched.status_code == 200
    assert fetched.json()["status"] == "completed"
    assert fetched.json()["result_data"]["prime_count"] == 3


def test_list_jobs_returns_recent_jobs(tmp_path: Path) -> None:
    client = build_client(tmp_path)
    queue_job(client, [1, 2, 3, 4, 5, 6], task_name="sum-of-squares")
    queue_job(client, [11, 12, 13, 14, 15], task_name="distribution")

    response = client.get("/jobs?limit=2")

    assert response.status_code == 200
    assert len(response.json()) == 2


def test_missing_job_returns_not_found(tmp_path: Path) -> None:
    client = build_client(tmp_path)

    response = client.get("/jobs/missing-job")

    assert response.status_code == 404


def test_rejects_all_zero_payload(tmp_path: Path) -> None:
    client = build_client(tmp_path)

    response = client.post(
        "/jobs/analytics",
        json={
            "task_name": "distribution",
            "numbers": [0, 0, 0, 0, 0],
            "bucket_size": 10,
        },
    )

    assert response.status_code == 422
