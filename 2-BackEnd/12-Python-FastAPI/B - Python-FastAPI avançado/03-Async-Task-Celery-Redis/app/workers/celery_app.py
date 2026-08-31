from celery import Celery

from app.core.settings import AppSettings

settings = AppSettings()

celery_app = Celery(
    "analytics_jobs",
    broker=settings.broker_url,
    backend=settings.result_backend,
)
celery_app.conf.update(
    task_always_eager=settings.celery_task_always_eager,
    task_eager_propagates=True,
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
    timezone="UTC",
    enable_utc=True,
)
celery_app.autodiscover_tasks(["app.workers"])
