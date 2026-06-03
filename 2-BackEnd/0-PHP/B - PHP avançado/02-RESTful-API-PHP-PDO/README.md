# RESTful API PHP PDO

A production-style RESTful API built in pure PHP using **PDO** with prepared statements for safe MySQL access — no frameworks required.

## Endpoints

| Method | Endpoint            | Description            |
|--------|---------------------|------------------------|
| GET    | `/api/products`     | List all products      |
| GET    | `/api/products/{id}`| Get a single product   |
| POST   | `/api/products`     | Create a new product   |
| PUT    | `/api/products/{id}`| Update a product       |
| DELETE | `/api/products/{id}`| Delete a product       |

## Architecture

```
├── config/db.php           # Database credentials
├── database/schema.sql     # Table definition + seed data
├── public/
│   ├── index.php           # Front controller + router
│   └── .htaccess           # Apache URL rewrite rules
└── src/
    ├── Database.php        # PDO factory (singleton)
    ├── Product.php         # Entity / DTO
    ├── ProductRepository.php  # All DB queries (prepared stmts)
    ├── ProductController.php  # CRUD business logic + JSON output
    └── Validator.php       # Input validation (required/numeric/min)
```

## Running

1. Import `database/schema.sql` into your MySQL server.
2. Update credentials in `config/db.php`.
3. Start PHP's built-in server pointed at `public/`:

```bash
php -S localhost:8000 -t public
```

4. Test with curl:

```bash
curl http://localhost:8000/api/products
curl -X POST http://localhost:8000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Monitor","description":"27 inch","price":1299.90,"stock":5}'
```
