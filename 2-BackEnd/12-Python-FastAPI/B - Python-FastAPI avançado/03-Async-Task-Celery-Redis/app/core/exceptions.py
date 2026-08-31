class JobNotFoundError(Exception):
    def __init__(self, job_id: str) -> None:
        super().__init__(f"job not found: {job_id}")
