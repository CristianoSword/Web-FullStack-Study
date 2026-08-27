from typing import List

from pydantic import BaseModel, Field


class NavItem(BaseModel):
    label: str = Field(..., min_length=2, max_length=40)
    href: str = Field(..., min_length=1, max_length=80)


class StaticPage(BaseModel):
    slug: str = Field(..., min_length=2, max_length=40)
    title: str = Field(..., min_length=3, max_length=80)
    subtitle: str = Field(..., min_length=3, max_length=160)
    body_sections: List[str] = Field(default_factory=list)
    nav_items: List[NavItem] = Field(default_factory=list)


class AssetManifest(BaseModel):
    stylesheet_path: str = Field(..., min_length=1)
    home_template: str = Field(..., min_length=1)
    about_template: str = Field(..., min_length=1)
