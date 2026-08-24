from pydantic import BaseModel, Field


class GreetingPayload(BaseModel):
    project: str = Field(..., min_length=3)
    message: str = Field(..., min_length=3)
    version: str = Field(..., min_length=1)
