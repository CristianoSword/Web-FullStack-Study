$commands = [ordered]@{
    AddPublic1 = "vercel env add NEXT_PUBLIC_APP_NAME"
    AddPublic2 = "vercel env add NEXT_PUBLIC_STAGE"
    AddServer  = "vercel env add API_BASE_URL"
    AddSecret  = "vercel env add INTERNAL_API_TOKEN"
    PullEnv    = "vercel env pull .env.local"
    CheckApi   = "http://localhost:3000/api/config"
}

[pscustomobject]$commands
