from app.db import PostgresClient


class ProductRepository:
    def __init__(self, postgres: PostgresClient) -> None:
        self.postgres = postgres

    def list_products(self) -> list[dict]:
        return self.postgres.list_products()

    def create_product(self, payload: dict) -> dict:
        return self.postgres.create_product(payload)
