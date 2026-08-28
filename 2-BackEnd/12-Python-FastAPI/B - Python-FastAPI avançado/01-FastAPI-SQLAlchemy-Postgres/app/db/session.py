from typing import Generator, Optional

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.core.settings import AppSettings

_engine = None
_session_factory = None


def get_engine(database_url: Optional[str] = None):
    global _engine
    if _engine is None or database_url is not None:
        resolved_url = database_url or AppSettings().database_url
        _engine = create_engine(resolved_url, future=True)
    return _engine


def get_session_factory(database_url: Optional[str] = None):
    global _session_factory
    if _session_factory is None or database_url is not None:
        _session_factory = sessionmaker(
            bind=get_engine(database_url),
            autocommit=False,
            autoflush=False,
            future=True,
            class_=Session,
        )
    return _session_factory


def get_db() -> Generator[Session, None, None]:
    session = get_session_factory()()
    try:
        yield session
    finally:
        session.close()
