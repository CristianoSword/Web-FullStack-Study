# List Recursion Recurs

Projeto em Erlang focado em manipulacao manual de listas com recursao de cauda.

## Objetivo

Construir um fluxo simples, mas real, para:

- criar jobs com rotulo e lista numerica
- calcular soma total por recursao
- inverter a lista manualmente
- filtrar numeros pares sem usar atalhos de biblioteca
- gerar uma visao consolidada do processamento

## Estrutura

- `src/list_recursion.hrl`: records compartilhados
- `src/list_recursion_types.erl`: tipos exportados
- `src/list_recursion_recurs.erl`: logica principal e testes EUnit
- `scripts/run_demo.erl`: entrada de demonstracao em modo `noshell`
- `scripts/run_demo.bat`: helper para compilar e executar no Windows

## Regras implementadas

- `new_job/2` exige `Label` binario e lista de numeros
- `validate_numbers/1` rejeita itens invalidos com erro explicito
- `analyze/1` valida a estrutura recebida antes de processar
- toda a manipulacao principal usa acumuladores e recursao de cauda

## Como executar

```powershell
erlc -o ebin src\list_recursion_recurs.erl src\list_recursion_types.erl
erlc -I src -pa ebin -o ebin scripts\run_demo.erl
erl -pa ebin -noshell -s run_demo main
```

Ou no Windows:

```powershell
scripts\run_demo.bat
```

## Testes

```powershell
erl -pa ebin -noshell -eval "eunit:test(list_recursion_recurs, [verbose]), init:stop()."
```

Os testes cobrem:

- analise completa da lista
- validacao de lista com item invalido
- rejeicao de job malformado
