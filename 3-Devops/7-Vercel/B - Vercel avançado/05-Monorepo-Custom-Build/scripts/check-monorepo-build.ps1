$commands = [ordered]@{
    ReviewWorkspaces = "Verificar package.json root e apps/*"
    ReviewBuild      = "Verificar vercel.json buildCommand/outputDirectory"
    ReviewTurbo      = "Verificar turbo.json"
    Dev              = "vercel dev"
}

[pscustomobject]$commands
