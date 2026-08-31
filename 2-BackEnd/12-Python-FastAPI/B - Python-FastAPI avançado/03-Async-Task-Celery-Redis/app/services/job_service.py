from datetime import datetime
from typing import Iterable

from sqlalchemy.orm import Session

from app.core.exceptions import JobNotFoundError
from app.models.job import Job
from app.repositories.job_repository import JobRepository
from app.schemas.jobs import AnalyticsJobCreate


class JobService:
    def __init__(self, session: Session) -> None:
        self.session = session
        self.repository = JobRepository(session)

    def create_job(self, payload: AnalyticsJobCreate) -> Job:
        job = self.repository.create(
            task_name=payload.task_name,
            payload=payload.dict(),
            status="queued",
        )
        self.session.commit()
        return job

    def get_job(self, job_id: str) -> Job:
        job = self.repository.get(job_id)
        if job is None:
            raise JobNotFoundError(job_id)
        return job

    def list_jobs(self, limit: int = 25) -> Iterable[Job]:
        return self.repository.list_recent(limit)

    def mark_running(self, job_id: str) -> Job:
        job = self.get_job(job_id)
        job.status = "running"
        job.started_at = datetime.utcnow()
        self.session.commit()
        self.session.refresh(job)
        return job

    def mark_completed(self, job_id: str, result_data: dict) -> Job:
        job = self.get_job(job_id)
        job.status = "completed"
        job.result_data = result_data
        job.error_message = None
        job.finished_at = datetime.utcnow()
        self.session.commit()
        self.session.refresh(job)
        return job

    def mark_failed(self, job_id: str, error_message: str) -> Job:
        job = self.get_job(job_id)
        job.status = "failed"
        job.error_message = error_message
        job.finished_at = datetime.utcnow()
        self.session.commit()
        self.session.refresh(job)
        return job
