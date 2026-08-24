from pydantic import BaseModel


class AppSettings(BaseModel):
    app_name: str = "FastAPI Hello World"
    app_version: str = "0.1.0"
