param(
  [Parameter(Mandatory = $true)]
  [string]$SagaId
)

Invoke-RestMethod -Method Get -Uri "http://localhost:3073/sagas/$SagaId"
