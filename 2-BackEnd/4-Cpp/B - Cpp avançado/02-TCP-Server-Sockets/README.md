# 02-TCP-Server-Sockets

Servidor de chat TCP multicliente em C++17 usando WinSock, historico em memoria, comandos de sala e scripts de build/smoke para Windows.

## O que foi implementado

- Servidor TCP real com `bind`, `listen`, `accept` e uma thread por cliente.
- Modelos para configuracao, sessoes conectadas, mensagens e comandos do chat.
- Estado compartilhado thread-safe com historico, lista de clientes e renomeacao.
- Comandos `/nick`, `/who`, `/history [n]`, `/help` e `/quit`.
- Scripts para compilar, subir o servidor, conectar um cliente de exemplo e rodar smoke test.

## Estrutura

- `include/socket_platform.hpp`: tipos e headers WinSock.
- `include/socket_guard.hpp`: validacao de config, bootstrap do WinSock e RAII para sockets.
- `include/socket_config.hpp`: host, porta, backlog, buffer e limite de clientes.
- `include/client_session.hpp`: sessao conectada e metadados do cliente.
- `include/chat_message.hpp`: mensagem persistida no historico.
- `include/server_command.hpp`: parser dos comandos do chat.
- `include/server_state.hpp`: estado compartilhado e thread-safe.
- `include/chat_server.hpp`: contrato do servidor TCP.
- `src/chat_server.cpp`: accept loop, broadcast, comandos e ciclo de vida dos clientes.
- `src/server_state.cpp`: historico e gestao de clientes.
- `src/server_command.cpp`: parser de comandos slash.
- `src/socket_guard.cpp`: inicializacao/cleanup do WinSock e fechamento automatico de sockets.
- `src/main.cpp`: CLI do binario.

## Como rodar

### Build

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build.ps1
```

Observacao: o projeto mantem `CMakeLists.txt`, mas o script de build local compila via `g++` porque o generator do MinGW falhou neste workspace com caminho acentuado no Windows.

### Subir o servidor

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\run-server.ps1 -- --host 127.0.0.1 --port 8080 --max-clients 16
```

### Cliente de exemplo

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\sample-client.ps1 -Port 8080
```

### Validar configuracao

```powershell
.\build\tcp_server_sockets.exe --validate-config --host 127.0.0.1 --port 9090 --max-clients 24 --backlog 12 --buffer-size 2048
```

### Smoke test

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\smoke.ps1 -Port 9092
```

## Comandos do chat

- `/nick <nome>`: troca o apelido da conexao atual.
- `/who`: lista os clientes conectados.
- `/history [n]`: mostra as ultimas `n` mensagens do historico.
- `/help`: mostra os comandos disponiveis.
- `/quit`: encerra a sessao.

Mensagens sem `/` sao publicadas para todos os clientes conectados.
