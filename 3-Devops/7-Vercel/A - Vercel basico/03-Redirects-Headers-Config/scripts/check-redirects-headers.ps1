$commands = [ordered]@{
    Dev          = "vercel dev"
    CheckRedirect = "curl -I http://localhost:3000/blog"
    CheckHeaders  = "curl -I http://localhost:3000/"
    CheckAsset    = "curl -I http://localhost:3000/assets/logo.svg"
    Deploy        = "vercel deploy"
}

[pscustomobject]$commands
