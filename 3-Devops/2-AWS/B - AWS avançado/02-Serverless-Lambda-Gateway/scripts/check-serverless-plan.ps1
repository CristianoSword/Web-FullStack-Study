$root = Split-Path -Parent $PSScriptRoot
$settings = Get-Content (Join-Path $root 'config/settings.json') | ConvertFrom-Json
$routes = Get-Content (Join-Path $root 'config/routes.json') | ConvertFrom-Json
$table = Get-Content (Join-Path $root 'config/dynamo-schema.json') | ConvertFrom-Json

[pscustomobject]@{
  BuildTemplate = 'sam build --template-file infra/template.yaml'
  DeployStack   = "sam deploy --stack-name $($settings.serviceName)-$($settings.stage) --region $($settings.region) --capabilities CAPABILITY_IAM"
  InvokeCreate  = 'sam local invoke CreateOrderFunction --event events/create-order.json'
  InvokeList    = 'sam local invoke ListOrdersFunction --event events/list-orders.json'
  ApiRoutes     = ($routes | ForEach-Object { "$($_.method) $($_.path)" }) -join ', '
  DynamoTable   = "$($table.tableName) [$($table.partitionKey.name), $($table.sortKey.name)]"
} | Format-List
