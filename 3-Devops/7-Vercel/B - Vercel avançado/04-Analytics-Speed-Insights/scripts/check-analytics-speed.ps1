$commands = [ordered]@{
    Dev             = "vercel dev"
    Home            = "http://localhost:3000/"
    ReviewLayout    = "Verificar app/layout.jsx para Analytics e SpeedInsights"
    ReviewThresholds = "Verificar config/performance-thresholds.json"
}

[pscustomobject]$commands
