$root = Split-Path -Parent $PSScriptRoot
$settings = Get-Content (Join-Path $root 'config/settings.json') | ConvertFrom-Json
$droplet = Get-Content (Join-Path $root 'config/droplet-spec.json') | ConvertFrom-Json
$sshKey = Get-Content (Join-Path $root 'config/ssh-key.json') | ConvertFrom-Json

[pscustomobject]@{
  ListKeys       = 'doctl compute ssh-key list'
  CreateDroplet  = "doctl compute droplet create $($droplet.name) --region $($droplet.region) --image $($droplet.image) --size $($droplet.size) --ssh-keys $($sshKey.fingerprint) --enable-monitoring --user-data-file cloud-init/bootstrap.yaml"
  PollDroplet    = "doctl compute droplet list --format Name,PublicIPv4,Status --no-header | findstr $($droplet.name)"
  SshCommand     = "ssh -i $($sshKey.privateKeyPath) $($sshKey.loginUser)@<droplet-ip>"
  RegionAndImage = "$($settings.region) / $($settings.image)"
} | Format-List
