# Registry Playbook

## Sequencia sugerida

```powershell
npm install
.\scripts\run-infra.ps1
.\scripts\start-api.ps1
.\scripts\check-health.ps1
.\scripts\register-v1-schema.ps1
.\scripts\check-v2-compatibility.ps1
.\scripts\register-v2-schema.ps1
.\scripts\publish-sample.ps1
.\scripts\decode-latest.ps1
.\scripts\check-status.ps1
```

## O que observar

- `register-v1-schema.ps1`: publica o contrato inicial do subject.
- `check-v2-compatibility.ps1`: valida a evolucao backward-compatible antes do registro.
- `publish-sample.ps1`: envia payload Avro serializado com magic byte e schema id.
- `decode-latest.ps1`: recompõe o payload usando o schema recuperado pelo id no Registry.
