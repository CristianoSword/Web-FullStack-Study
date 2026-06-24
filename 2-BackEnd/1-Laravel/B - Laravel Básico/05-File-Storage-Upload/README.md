# File Storage Upload - Laravel

Projeto didatico para estudar upload, indexacao local de metadados e download de arquivos em uma estrutura simples de Laravel.

## Objetivo

Oferecer uma base enxuta para:

- receber arquivos enviados por formulario
- classificar uploads por categoria
- persistir metadados localmente em JSON
- listar arquivos enviados
- permitir download posterior pelo id salvo no indice

## Funcionalidades

- Painel com formulario de upload
- Categorias configuraveis em `config/files.php`
- Validacao de responsavel, categoria, mime type e tamanho
- Armazenamento local em `storage/app/private/uploads`
- Indice JSON em `storage/app/private/indexes/uploads.json`
- Listagem de uploads com tamanho e link de download

## Estrutura

```text
05-File-Storage-Upload/
├── app/
│   ├── Contracts/
│   │   └── UploadIndex.php
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── FileUploadController.php
│   │   └── Requests/
│   │       └── StoreUploadRequest.php
│   ├── Models/
│   │   ├── FileCategory.php
│   │   └── StoredUpload.php
│   └── Support/
│       ├── JsonUploadIndex.php
│       └── LocalUploadCatalog.php
├── config/
│   └── files.php
├── public/css/site.css
├── resources/views/
│   ├── layouts/app.blade.php
│   └── pages/index.blade.php
├── routes/web.php
└── storage/app/private/
    ├── indexes/
    └── uploads/
```

## Rotas

| Metodo | Rota | Acao |
|--------|------|------|
| GET | `/` | Tela de upload e listagem |
| POST | `/upload` | Recebe e salva arquivo |
| GET | `/download/{id}` | Faz download do item salvo |

## Fluxo do upload

1. O formulario envia `uploaded_by`, `category` e `document`.
2. `StoreUploadRequest` valida os dados e o arquivo.
3. `LocalUploadCatalog` salva o binario em `storage/app/private/uploads`.
4. `JsonUploadIndex` registra os metadados no indice JSON.
5. O painel passa a listar o novo item e disponibiliza o download.

## Como adaptar para um app Laravel real

1. Copie os arquivos para um projeto Laravel completo.
2. Garanta permissao de escrita em `storage/app/private`.
3. Rode `composer dump-autoload`.
4. Registre as rotas do projeto.
5. Teste uploads com PDF, PNG, JPG e DOCX.

## Fases concluidas

- `[01/06] setup`
- `[02/06] types/models`
- `[03/06] core-logic`
- `[04/06] ui/routes`
- `[05/06] validation/fixes`
- `[06/06] docs`
