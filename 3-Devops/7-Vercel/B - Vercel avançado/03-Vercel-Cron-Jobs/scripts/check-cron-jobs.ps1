$commands = [ordered]@{
    Dev          = "vercel dev"
    DailyReport  = "Invoke-RestMethod -Method Get -Uri http://localhost:3000/api/cron/daily-report -Headers @{ Authorization = 'Bearer study-cron-secret' }"
    Cleanup      = "Invoke-RestMethod -Method Get -Uri http://localhost:3000/api/cron/cleanup-previews -Headers @{ Authorization = 'Bearer study-cron-secret' }"
    Unauthorized = "Invoke-RestMethod -Method Get -Uri http://localhost:3000/api/cron/daily-report"
}

[pscustomobject]$commands
