$root = Split-Path -Parent $PSScriptRoot
$spec = Get-Content (Join-Path $root 'config/instance-spec.json') | ConvertFrom-Json
$firewall = Get-Content (Join-Path $root 'config/firewall-rule.json') | ConvertFrom-Json

[pscustomobject]@{
  CreateVm    = "gcloud compute instances create $($spec.name) --zone $($spec.zone) --machine-type $($spec.machineType) --image-family $($spec.imageFamily) --image-project $($spec.imageProject) --metadata-from-file startup-script=startup/startup.sh --tags $($spec.networkTags -join ',')"
  Firewall    = "gcloud compute firewall-rules create $($firewall.name) --allow tcp:80,tcp:443 --target-tags $($firewall.targetTags -join ',')"
  DescribeVm  = "gcloud compute instances describe $($spec.name) --zone $($spec.zone)"
  OpenSsh     = "gcloud compute ssh $($spec.name) --zone $($spec.zone)"
  StartupFile = 'startup/startup.sh'
} | Format-List
