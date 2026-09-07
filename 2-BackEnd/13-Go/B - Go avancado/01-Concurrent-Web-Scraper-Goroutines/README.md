# Concurrent Web Scraper Goroutines

Scraper concorrente em Go com worker pool baseado em `goroutines`, `channels`, `WaitGroup`, retry e parsing real de HTML.

## Estrutura

- `cmd/scraper/main.go`: entrypoint da CLI.
- `config/targets.txt`: lista inicial de URLs.
- `internal/domain`: tipos de alvo, resultado e relatório.
- `internal/service`: loader de URLs, worker pool e parser HTML.
- `internal/ui`: flags e impressão do relatório final.

## Funcionalidades

- leitura de múltiplas URLs a partir de arquivo
- concorrência configurável
- timeout por request
- retry automático para falhas
- extração de `title`, headings, quantidade de links e keywords
- relatório agregado com média de latência e totais por sucesso/falha

## Executar

```bash
go run ./cmd/scraper -targets ./config/targets.txt -concurrency 4 -timeout 5s -retries 1
```

## Testes

```bash
go test ./...
```

## Exemplo de saída

```text
targets=2 completed=2 failed=0 total-duration=212ms avg-latency=95ms
[OK] https://example.com status=200 title="Example Domain" links=1 words=28 retries=0 duration=81ms
  headings=Example Domain
  keywords=example=2, domain=2
```
