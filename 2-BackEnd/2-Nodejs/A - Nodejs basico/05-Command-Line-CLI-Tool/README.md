# 05-Command-Line-CLI-Tool

CLI simples em Node.js para estudar parsing de argumentos e fluxo de comandos.

## Comandos

- `node src/index.js list`
- `node src/index.js add "Write backend summary"`
- `node src/index.js done 1`

## Estrutura

- `src/index.js`: ponto de entrada do utilitario.
- `src/models/task-command.js`: catalogo dos comandos disponiveis.
- `src/services/task-cli-store.js`: armazenamento em memoria das tarefas.
- `src/validators/cli-arguments.js`: validacao e parse dos argumentos.

## Comportamento

- lista tarefas por padrao quando nenhum comando e informado;
- impede comando desconhecido;
- exige titulo no `add`;
- exige id numerico positivo no `done`.
