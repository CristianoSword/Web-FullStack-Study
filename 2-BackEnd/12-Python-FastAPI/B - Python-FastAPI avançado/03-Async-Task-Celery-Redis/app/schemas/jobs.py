from datetime import datetime
from typing import Dict, List, Literal, Optional

from pydantic import BaseModel, Field, validator

JobKind = Literal["distribution", "prime-scan", "sum-of-squares"]
JobStatus = Literal["queued", "running", "completed", "failed"]


class AnalyticsJobCreate(BaseModel):
    task_name: JobKind
    numbers: List[int] = Field(..., min_items=5, max_items=5000)
    bucket_size: int = Field(default=10, ge=1, le=1000)

    @validator("numbers")
    def validate_numbers(cls, values: List[int]) -> List[int]:
        if all(number == 0 for number in values):
            raise ValueError("numbers cannot be all zeros")
        return values


class AnalyticsSummary(BaseModel):
    count: int
    total: int
    average: float
    minimum: int
    maximum: int
    sum_of_squares: int
    prime_count: int
    histogram: Dict[str, int]


class JobQueueResponse(BaseModel):
    job_id: str
    status: JobStatus
    celery_task_id: Optional[str] = None


class JobRead(BaseModel):
    id: str
    task_name: str
    status: str
    payload: dict
    result_data: Optional[dict] = None
    error_message: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    started_at: Optional[datetime] = None
    finished_at: Optional[datetime] = None

    class Config:
        orm_mode = True


class JobListItem(BaseModel):
    id: str
    task_name: str
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
