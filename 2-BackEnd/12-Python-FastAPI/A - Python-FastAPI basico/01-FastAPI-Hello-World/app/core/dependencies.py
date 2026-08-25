from fastapi import Query, Request

from app.core.settings import AppSettings
from app.models.greeting import GreetingQuery


def get_settings(request: Request) -> AppSettings:
    return request.app.state.settings


def get_greeting_query(
    name: str = Query(default="developer", min_length=2, max_length=40),
) -> GreetingQuery:
    return GreetingQuery(name=name)
