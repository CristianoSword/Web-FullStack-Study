from typing import List, Optional

from sqlalchemy import desc, select
from sqlalchemy.orm import Session

from app.models.job import Job


class JobRepository:
    def __init__(self, session: Session) -> None:
        self.session = session

    def create(self, *, task_name: str, payload: dict, status: str) -> Job:
        job = Job(task_name=task_name, payload=payload, status=status)
        self.session.add(job)
        self.session.flush()
        self.session.refresh(job)
        return job

    def get(self, job_id: str) -> Optional[Job]:
        statement = select(Job).where(Job.id == job_id)
        return self.session.scalar(statement)

    def list_recent(self, limit: int = 25) -> List[Job]:
        statement = select(Job).order_by(desc(Job.created_at)).limit(limit)
        return list(self.session.scalars(statement))
