# File Reader Writer

CLI em Go para leitura e analise segura de arquivos texto dentro de uma pasta base controlada.

## Estrutura

- `cmd/filetool/main.go`: entrypoint da aplicacao.
- `internal/domain`: tipos para relatorio, busca e comparacao.
- `internal/service`: leitura segura, tokenizacao, busca e diff semantico por palavras.
- `internal/ui`: CLI interativa.
- `samples`: arquivos de exemplo para smoke manual.

## Funcionalidades

- leitura segura com bloqueio de path traversal
- limite maximo de tamanho de arquivo
- contagem de linhas, palavras, bytes e caracteres
- top palavras mais frequentes
- busca de termo com linha de ocorrencia
- comparacao entre dois arquivos por metrica e vocabulario

## Executar

```bash
go run ./cmd/filetool
```

## Testes

```bash
go test ./...
```

## Comandos

```text
inspect inventory.txt
search notes.txt reader
compare inventory.txt notes.txt
exit
```
