from math import isqrt

from app.core.settings import AppSettings
from app.db.session import get_session_factory
from app.services.job_service import JobService
from app.workers.celery_app import celery_app


def is_prime(value: int) -> bool:
    if value < 2:
        return False
    if value == 2:
        return True
    if value % 2 == 0:
        return False
    limit = isqrt(value)
    for divisor in range(3, limit + 1, 2):
        if value % divisor == 0:
            return False
    return True


def build_histogram(numbers: list[int], bucket_size: int) -> dict[str, int]:
    histogram: dict[str, int] = {}
    for number in numbers:
        start = (number // bucket_size) * bucket_size
        end = start + bucket_size - 1
        label = f"{start}:{end}"
        histogram[label] = histogram.get(label, 0) + 1
    return histogram


def compute_analytics(numbers: list[int], bucket_size: int) -> dict:
    total = sum(numbers)
    count = len(numbers)
    return {
        "count": count,
        "total": total,
        "average": round(total / count, 4),
        "minimum": min(numbers),
        "maximum": max(numbers),
        "sum_of_squares": sum(number * number for number in numbers),
        "prime_count": sum(1 for number in numbers if is_prime(abs(number))),
        "histogram": build_histogram(numbers, bucket_size),
    }


@celery_app.task(name="analytics.process_job")
def process_analytics_job(job_id: str, numbers: list[int], bucket_size: int) -> dict:
    settings = AppSettings()
    session = get_session_factory(settings.database_url)()
    service = JobService(session)
    try:
        service.mark_running(job_id)
        result_data = compute_analytics(numbers, bucket_size)
        service.mark_completed(job_id, result_data)
        return result_data
    except Exception as exc:
        service.mark_failed(job_id, str(exc))
        raise
    finally:
        session.close()
