$commands = [ordered]@{
    Login    = "vercel login"
    Link     = "vercel link"
    PullEnv  = "vercel env pull .env.local"
    Dev      = "vercel dev"
    Endpoint = "http://localhost:3000/api/health"
}

[pscustomobject]$commands
