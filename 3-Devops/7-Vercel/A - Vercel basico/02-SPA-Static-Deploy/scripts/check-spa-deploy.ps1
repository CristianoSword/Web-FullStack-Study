$commands = [ordered]@{
    Dev         = "vercel dev"
    CheckRoot   = "http://localhost:3000/"
    CheckRoute1 = "http://localhost:3000/catalog"
    CheckRoute2 = "http://localhost:3000/progress"
    Deploy      = "vercel deploy"
}

[pscustomobject]$commands
