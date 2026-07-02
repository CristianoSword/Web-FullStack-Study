# 01-Multithreaded-Task-Pool

Pool de tarefas com threads reais, fila compartilhada e sincronizacao por condition variable.

## Arquivos

- `include/task_pool.hpp`: contrato do pool e controle das workers.
- `src/task_pool.cpp`: enfileiramento, execucao concorrente e espera por idle.
- `src/main.cpp`: dispara tarefas e imprime o estado consolidado.
