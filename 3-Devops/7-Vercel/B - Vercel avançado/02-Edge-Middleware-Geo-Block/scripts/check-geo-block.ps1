$commands = [ordered]@{
    Dev          = "vercel dev"
    AllowedFlow  = "curl -I -H ""x-vercel-ip-country: BR"" http://localhost:3000/"
    BlockedFlow  = "curl -I -H ""x-vercel-ip-country: IR"" http://localhost:3000/"
    AssetBypass  = "curl -I http://localhost:3000/assets/status.txt"
    BlockedPage  = "http://localhost:3000/blocked.html"
}

[pscustomobject]$commands
