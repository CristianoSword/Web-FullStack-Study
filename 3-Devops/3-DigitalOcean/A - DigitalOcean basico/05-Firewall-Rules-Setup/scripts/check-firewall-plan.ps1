$root = Split-Path -Parent $PSScriptRoot
$settings = Get-Content (Join-Path $root 'config/settings.json') | ConvertFrom-Json
$inbound = Get-Content (Join-Path $root 'config/inbound-rules.json') | ConvertFrom-Json
$outbound = Get-Content (Join-Path $root 'config/outbound-rules.json') | ConvertFrom-Json

[pscustomobject]@{
  CreateFirewall = "doctl compute firewall create --name $($settings.firewallName) --tag-names $($settings.dropletTag)"
  InboundRules   = ($inbound | ForEach-Object { "$($_.protocol):$($_.ports)" }) -join ', '
  OutboundRules  = ($outbound | ForEach-Object { "$($_.protocol):$($_.ports)" }) -join ', '
  InspectRuleSet = 'doctl compute firewall get <firewall-id>'
  TestSsh        = 'nc -zv <droplet-ip> 22'
} | Format-List
