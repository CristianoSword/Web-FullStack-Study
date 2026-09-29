# Topic Partition Explorer

CLI de exploracao Kafka com `kafkajs` para inspecionar topicos, particoes, offsets e consumer groups em um lab local.

## Estrutura

- `docker-compose.yml`: sobe um broker Kafka local em modo KRaft.
- `config/explorer-config.json`: broker, topicos do lab e consumer group usado no seed.
- `models/*.schema.json`: contratos dos relatorios de topico e grupo.
- `src/cli/explorer.mjs`: entrada principal para explorar topicos e grupos.
- `src/lib/`: carregamento de config, cliente Kafka e formatacao dos relatorios.
- `scripts/bootstrap-lab.ps1`: cria os topicos e semeia mensagens/offsets para o grupo de exemplo.
- `scripts/explore-*.ps1`: atalhos para explorar topicos e grupos.
- `scripts/validate-explorer.mjs`: validacao estrutural do projeto.
- `examples/explorer-playbook.md`: fluxo guiado de uso.

## Recursos cobertos

- listagem de topicos via `admin.listTopics()`
- metadata de topicos e particoes com lider, replicas e ISR
- leitura de high/low offsets por particao
- listagem de consumer groups
- detalhamento de grupo com membros, offsets e lag
- seed automatizado para gerar estado real de exploracao

## Executar

```powershell
npm install
.\scripts\run-broker.ps1
.\scripts\bootstrap-lab.ps1
.\scripts\explore-topics.ps1
.\scripts\explore-topic.ps1 orders.events.v1
.\scripts\explore-groups.ps1
.\scripts\explore-group.ps1 explorer-audit-group
```

## Validar estrutura

```powershell
node .\scripts\validate-explorer.mjs
docker compose config
```

## Observacao

Os scripts de broker falham explicitamente quando o Docker daemon local nao estiver ativo, para evitar falso positivo na execucao do lab.
