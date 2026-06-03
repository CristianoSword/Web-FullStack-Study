# MVC Framework From Scratch

A lightweight, modular, and extensible Model-View-Controller (MVC) framework built completely from scratch in modern object-oriented PHP.

## Features

- **Front Controller Pattern:** Single entrypoint (`public/index.php`) boots the entire application.
- **Custom Router:** Supports basic HTTP GET and POST request mapping to closures or Controller actions (`Controller@action` syntax).
- **Core Request & Response wrappers:** Sanitize input and support formatted JSON APIs or redirects.
- **PDO Database Abstraction:** Reusable connection singleton and a base active-record model wrapper.
- **View Buffering & Layout Wrapper:** Renders views dynamically within a nested master layout.
- **Data Validator:** Rule-based custom server-side validator (`required`, `email`, `min:length`).
- **Custom Error View:** Displays 404/500 errors beautifully styled within the application wrapper.

## Directory Structure

```text
├── app/
│   ├── Controllers/   # Web/API Controllers
│   ├── Models/        # Database Models
│   └── Views/         # View templates and layouts
├── config/
│   └── config.php     # Global DB and App configs
├── core/
│   ├── Application.php# Core app engine
│   ├── Controller.php # Base controller class
│   ├── Database.php   # PDO DB helper (singleton pattern)
│   ├── Model.php      # Base model class (CRUD logic)
│   ├── Request.php    # HTTP Request parser
│   ├── Response.php   # HTTP Response renderer
│   ├── Router.php     # Route compiler and dispatcher
│   └── Validator.php  # Core rule validation engine
├── public/
│   └── index.php      # Application entrypoint
└── composer.json      # PSR-4 Autoload specifications
```

## Setup & Running

1. Run composer autoloading to register the namespace paths:
   ```bash
   composer dump-autoload
   ```
2. Configure database credentials inside `config/config.php`.
3. Boot the application using PHP's built-in web server inside the public directory:
   ```bash
   php -S localhost:8000 -t public
   ```
4. Access `http://localhost:8000` in your web browser.
