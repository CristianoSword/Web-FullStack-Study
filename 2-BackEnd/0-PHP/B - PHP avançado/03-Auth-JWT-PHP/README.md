# Auth JWT PHP

Sistema de autenticação com JSON Web Tokens implementado em PHP puro, sem dependências complexas.

## 🚀 Funcionalidades

- Registro de usuários com hash de senha (bcrypt)
- Login com geração de token JWT
- Endpoint protegido com middleware de autenticação
- Validação de token JWT com verificação de expiração
- Suporte a algoritmos HS256, HS384 e HS512

## 📋 Pré-requisitos

- PHP 8.0 ou superior
- MySQL 5.7 ou superior
- Composer (para autoload)

## 🔧 Instalação

1. Clone o repositório e navegue até o diretório do projeto:
```bash
cd 2-BackEnd/0-PHP/B - PHP avançado/03-Auth-JWT-PHP
```

2. Instale as dependências (apenas para gerar autoload):
```bash
composer install
```

3. Configure o banco de dados no arquivo `config/config.php`:
```php
'db' => [
    'host'    => 'localhost',
    'dbname'  => 'auth_db',
    'user'    => 'root',
    'pass'    => '',
    'charset' => 'utf8mb4',
],
```

4. Crie o banco de dados executando o schema:
```bash
mysql -u root -p < database/schema.sql
```

5. Configure o servidor web para apontar para o diretório `public/`:
```bash
php -S localhost:8000 -t public
```

## 📡 API Endpoints

### Registrar Usuário
**POST** `/register`

**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@example.com"
  }
}
```

### Login
**POST** `/login`

**Body:**
```json
{
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@example.com"
  }
}
```

### Endpoint Protegido
**GET** `/me`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "message": "Protected route accessed successfully",
  "user_id": 1,
  "email": "joao@example.com"
}
```

## 🔐 Configuração JWT

Configure as opções JWT no arquivo `config/config.php`:

```php
'jwt_secret' => 'my_super_secret_key_change_in_prod',
'jwt_algo'   => 'HS256',
'jwt_ttl'    => 3600,  // 1 hora em segundos
```

- `jwt_secret`: Chave secreta para assinar tokens (mude em produção!)
- `jwt_algo`: Algoritmo de assinatura (HS256, HS384, HS512)
- `jwt_ttl`: Tempo de vida do token em segundos

## 🧪 Testando com cURL

### Registrar:
```bash
curl -X POST http://localhost:8000/register \
  -H "Content-Type: application/json" \
  -d '{"name":"João Silva","email":"joao@example.com","password":"senha123"}'
```

### Login:
```bash
curl -X POST http://localhost:8000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@example.com","password":"senha123"}'
```

### Endpoint Protegido:
```bash
curl -X GET http://localhost:8000/me \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## 📁 Estrutura do Projeto

```
03-Auth-JWT-PHP/
├── config/
│   └── config.php          # Configurações do banco e JWT
├── database/
│   └── schema.sql          # Schema do banco de dados
├── public/
│   ├── index.php           # Entry point da API
│   └── .htaccess           # Configuração de rewrite
├── src/
│   ├── User.php            # Modelo de usuário
│   ├── UserRepository.php  # Repositório de dados
│   ├── JWTService.php      # Serviço de JWT
│   ├── AuthService.php     # Serviço de autenticação
│   └── AuthMiddleware.php  # Middleware de autenticação
├── composer.json           # Dependências e autoload
└── README.md               # Documentação
```

## 🔒 Segurança

- Senhas são hasheadas usando bcrypt (PASSWORD_BCRYPT)
- Tokens JWT são assinados com HMAC
- Validação de expiração de tokens
- Middleware para proteção de rotas
- SQL injection prevenido com prepared statements

## 📝 Notas

- Este projeto foi desenvolvido para fins educacionais
- Em produção, use HTTPS para todas as requisições
- Armazene a chave JWT secret em variáveis de ambiente
- Considere usar refresh tokens para melhor UX
- Implemente rate limiting para prevenir ataques de força bruta
