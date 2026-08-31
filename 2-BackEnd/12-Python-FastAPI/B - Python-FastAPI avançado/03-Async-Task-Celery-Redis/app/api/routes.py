from typing import List

from fastapi import APIRouter, Depends, Query, status

from app.api.dependencies import get_job_service
from app.schemas.jobs import AnalyticsJobCreate, JobListItem, JobQueueResponse, JobRead
from app.services.job_service import JobService
from app.workers.tasks import process_analytics_job

router = APIRouter()


@router.get("/health")
def healthcheck() -> dict[str, str]:
    return {"status": "ok", "service": "celery-redis-jobs"}


@router.post(
    "/jobs/analytics",
    response_model=JobQueueResponse,
    status_code=status.HTTP_202_ACCEPTED,
)
def queue_analytics_job(
    payload: AnalyticsJobCreate,
    job_service: JobService = Depends(get_job_service),
) -> JobQueueResponse:
    job = job_service.create_job(payload)
    async_result = process_analytics_job.delay(job.id, payload.numbers, payload.bucket_size)
    return JobQueueResponse(job_id=job.id, status=job.status, celery_task_id=async_result.id)


@router.get("/jobs", response_model=List[JobListItem])
def list_jobs(
    limit: int = Query(default=25, ge=1, le=100),
    job_service: JobService = Depends(get_job_service),
) -> List[JobListItem]:
    jobs = job_service.list_jobs(limit=limit)
    return [JobListItem.from_orm(job) for job in jobs]


@router.get("/jobs/{job_id}", response_model=JobRead)
def get_job(job_id: str, job_service: JobService = Depends(get_job_service)) -> JobRead:
    job = job_service.get_job(job_id)
    return JobRead.from_orm(job)
