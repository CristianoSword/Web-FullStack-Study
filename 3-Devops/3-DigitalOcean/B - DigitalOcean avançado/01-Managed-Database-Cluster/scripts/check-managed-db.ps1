$root = Split-Path -Parent $PSScriptRoot
$settings = Get-Content (Join-Path $root 'config/settings.json') | ConvertFrom-Json
$cluster = Get-Content (Join-Path $root 'config/cluster-spec.json') | ConvertFrom-Json
$trusted = Get-Content (Join-Path $root 'config/trusted-sources.json') | ConvertFrom-Json

[pscustomobject]@{
  CreateCluster  = "doctl databases create $($cluster.name) --engine $($cluster.engine) --version $($cluster.version) --region $($cluster.region) --size $($cluster.size) --num-nodes $($cluster.nodeCount)"
  GetConnection  = "doctl databases connection $($cluster.name)"
  AddTrustedIp   = "doctl databases firewalls append $($cluster.name) --rule ip_addr:$($trusted.addresses[0])"
  SqlBootstrap   = 'psql "<connection-string>" -f sql/001_create_schema.sql'
  Maintenance    = "$($cluster.maintenanceWindow.day) at $($cluster.maintenanceWindow.hour)"
} | Format-List
