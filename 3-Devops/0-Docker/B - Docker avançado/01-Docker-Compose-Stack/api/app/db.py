from psycopg import connect


class PostgresClient:
    def __init__(self, dsn: str) -> None:
        self.dsn = dsn

    def initialize(self) -> None:
        with connect(self.dsn) as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    CREATE TABLE IF NOT EXISTS products (
                        id SERIAL PRIMARY KEY,
                        sku VARCHAR(50) NOT NULL UNIQUE,
                        name VARCHAR(120) NOT NULL,
                        price NUMERIC(10,2) NOT NULL
                    )
                    """
                )
            connection.commit()

    def list_products(self) -> list[dict]:
        with connect(self.dsn) as connection:
            with connection.cursor() as cursor:
                cursor.execute("SELECT id, sku, name, price FROM products ORDER BY id")
                rows = cursor.fetchall()
        return [
            {"id": row[0], "sku": row[1], "name": row[2], "price": float(row[3])}
            for row in rows
        ]

    def create_product(self, payload: dict) -> dict:
        with connect(self.dsn) as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    INSERT INTO products (sku, name, price)
                    VALUES (%s, %s, %s)
                    RETURNING id, sku, name, price
                    """,
                    (payload["sku"].upper(), payload["name"], payload["price"]),
                )
                row = cursor.fetchone()
            connection.commit()
        return {"id": row[0], "sku": row[1], "name": row[2], "price": float(row[3])}
