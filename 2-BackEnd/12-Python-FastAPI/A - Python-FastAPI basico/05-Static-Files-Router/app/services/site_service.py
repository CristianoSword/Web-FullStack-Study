from pathlib import Path

from app.core.exceptions import AssetValidationError
from app.models.site import AssetManifest, NavItem, StaticPage


class SiteService:
    def get_asset_manifest(self) -> AssetManifest:
        return AssetManifest(
            stylesheet_path="/static/site.css",
            home_template="home.html",
            about_template="about.html",
        )

    def get_home_page(self) -> StaticPage:
        return StaticPage(
            slug="home",
            title="Static pages served by FastAPI",
            subtitle="A small site powered by HTML templates and local CSS assets.",
            body_sections=[
                "Use this project to learn how FastAPI can serve static files without turning the app into a one-file demo.",
                "The homepage and about page are rendered from template files while the stylesheet is delivered from a dedicated static directory.",
            ],
            nav_items=[
                NavItem(label="Home", href="/"),
                NavItem(label="About", href="/about"),
            ],
        )

    def get_about_page(self) -> StaticPage:
        return StaticPage(
            slug="about",
            title="About the study project",
            subtitle="Why static file routing still matters in backend fundamentals.",
            body_sections=[
                "Static assets are often the first step before full template engines or frontend bundlers.",
                "Serving CSS and HTML locally is useful for internal tools, docs portals and admin screens.",
                "This example keeps the structure simple while still separating content, assets and routing.",
            ],
        )

    def validate_assets(self, base_dir: Path) -> None:
        manifest = self.get_asset_manifest()
        required_paths = [
            base_dir / "static" / Path(manifest.stylesheet_path).name,
            base_dir / "templates" / manifest.home_template,
            base_dir / "templates" / manifest.about_template,
        ]
        for path in required_paths:
            if not path.exists():
                raise AssetValidationError(path.name)
