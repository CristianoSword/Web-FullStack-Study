$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

if (-not (Test-Path ".env")) {
  Copy-Item ".env.example" ".env"
}

$envMap = @{}
Get-Content ".env" | ForEach-Object {
  if ($_ -match "^\s*#") { return }
  if ($_ -match "=") {
    $parts = $_ -split "=", 2
    $envMap[$parts[0].Trim()] = $parts[1].Trim()
  }
}

Write-Host "MongoDB Compass connection:"
Write-Host ("mongodb://{0}:{1}@localhost:{2}/admin" -f $envMap["MONGO_INITDB_ROOT_USERNAME"], $envMap["MONGO_INITDB_ROOT_PASSWORD"], $envMap["MONGO_PORT"])
Write-Host ""
Write-Host "Running overview query inside the container..."

docker exec mongodb-compass-lab mongosh `
  --username $envMap["MONGO_INITDB_ROOT_USERNAME"] `
  --password $envMap["MONGO_INITDB_ROOT_PASSWORD"] `
  --authenticationDatabase admin `
  --eval "db = db.getSiblingDB('$($envMap["MONGO_APP_DATABASE"])'); printjson(db.products.find({}, {_id:0, sku:1, name:1, stock:1}).toArray())"
