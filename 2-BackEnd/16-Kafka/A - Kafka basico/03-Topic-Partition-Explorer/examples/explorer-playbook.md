# Explorer Playbook

## Sequencia sugerida

```powershell
npm install
.\scripts\run-broker.ps1
.\scripts\bootstrap-lab.ps1
.\scripts\explore-topics.ps1
.\scripts\explore-topic.ps1 orders.events.v1
.\scripts\explore-groups.ps1
.\scripts\explore-group.ps1 explorer-audit-group
```

## O que observar

- `explore-topics.ps1`: lista topicos com lider, replicas, ISR e high/low offsets por particao.
- `explore-topic.ps1`: foca em um topico para inspecao detalhada de particoes e offsets.
- `explore-groups.ps1`: lista grupos encontrados e os offsets consumidos para os topicos do lab.
- `explore-group.ps1`: mostra estado, membros e lag do grupo explorado.

## Encerramento

```powershell
.\scripts\stop-broker.ps1
```
