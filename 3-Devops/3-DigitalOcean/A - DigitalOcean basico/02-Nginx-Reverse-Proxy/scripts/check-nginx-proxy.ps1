$root = Split-Path -Parent $PSScriptRoot
$settings = Get-Content (Join-Path $root 'config/settings.json') | ConvertFrom-Json
$upstream = Get-Content (Join-Path $root 'config/upstream.json') | ConvertFrom-Json

[pscustomobject]@{
  ValidateNginx    = 'sudo nginx -t'
  EnableSite       = 'sudo ln -s /etc/nginx/sites-available/study-app.conf /etc/nginx/sites-enabled/study-app.conf'
  ReloadNginx      = 'sudo systemctl reload nginx'
  LocalHealth      = "curl -I http://127.0.0.1:$($settings.appPort)/health"
  PublicHealth     = "curl -I http://$($settings.serverName)/health"
  UpstreamTargets  = ($upstream.targets | ForEach-Object { "$($_.host):$($_.port)" }) -join ', '
} | Format-List
