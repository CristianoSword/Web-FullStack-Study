class CatalogItemNotFoundError(Exception):
    def __init__(self, category: str, slug: str) -> None:
        super().__init__(f"Catalog item '{category}/{slug}' was not found")
        self.category = category
        self.slug = slug
