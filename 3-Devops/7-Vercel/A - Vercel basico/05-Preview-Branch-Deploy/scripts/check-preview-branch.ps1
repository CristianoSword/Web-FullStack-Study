$commands = [ordered]@{
    CreateBranch = "git checkout -b feature/banner-preview"
    Dev          = "vercel dev"
    Preview      = "vercel deploy"
    CheckApi     = "http://localhost:3000/api/deploy-context"
    PromoteMain  = "git checkout main"
}

[pscustomobject]$commands
