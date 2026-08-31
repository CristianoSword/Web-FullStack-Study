from typing import Generator, Optional

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.core.settings import AppSettings

_engine = None
_session_factory = None
_engine_url = None
_session_factory_url = None


def _build_engine(database_url: str):
    if database_url.startswith("sqlite"):
        poolclass = StaticPool if ":memory:" in database_url else None
        return create_engine(
            database_url,
            future=True,
            connect_args={"check_same_thread": False},
            poolclass=poolclass,
        )
    return create_engine(database_url, future=True)


def get_engine(database_url: Optional[str] = None):
    global _engine, _engine_url
    resolved_url = database_url or AppSettings().database_url
    if _engine is None or database_url is not None or _engine_url != resolved_url:
        engine = _build_engine(resolved_url)
        if database_url is None:
            _engine = engine
            _engine_url = resolved_url
            return _engine
        return engine
    return _engine


def get_session_factory(database_url: Optional[str] = None):
    global _session_factory, _session_factory_url
    resolved_url = database_url or AppSettings().database_url
    if _session_factory is None or database_url is not None or _session_factory_url != resolved_url:
        factory = sessionmaker(
            bind=get_engine(resolved_url),
            autocommit=False,
            autoflush=False,
            future=True,
            class_=Session,
        )
        if database_url is None:
            _session_factory = factory
            _session_factory_url = resolved_url
            return _session_factory
        return factory
    return _session_factory


def get_db() -> Generator[Session, None, None]:
    session = get_session_factory()()
    try:
        yield session
    finally:
        session.close()
