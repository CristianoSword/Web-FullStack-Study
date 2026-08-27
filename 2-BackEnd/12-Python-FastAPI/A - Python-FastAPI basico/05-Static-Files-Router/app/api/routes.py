from pathlib import Path

from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from app.services.site_service import SiteService

router = APIRouter()
templates = Jinja2Templates(directory=str(Path(__file__).resolve().parents[1] / "templates"))
service = SiteService()


@router.get("/health")
def healthcheck() -> dict[str, str]:
    return {"status": "ok", "service": "static-files-router"}


@router.get("/", response_class=HTMLResponse)
def home_page(request: Request) -> HTMLResponse:
    page = service.get_home_page()
    manifest = service.get_asset_manifest()
    return templates.TemplateResponse(
        manifest.home_template,
        {
            "request": request,
            "title": page.title,
            "subtitle": page.subtitle,
            "body_sections": page.body_sections,
            "nav_items": page.nav_items,
            "stylesheet_path": manifest.stylesheet_path,
        },
    )


@router.get("/about", response_class=HTMLResponse)
def about_page(request: Request) -> HTMLResponse:
    page = service.get_about_page()
    manifest = service.get_asset_manifest()
    return templates.TemplateResponse(
        manifest.about_template,
        {
            "request": request,
            "title": page.title,
            "subtitle": page.subtitle,
            "body_sections": page.body_sections,
            "stylesheet_path": manifest.stylesheet_path,
        },
    )
