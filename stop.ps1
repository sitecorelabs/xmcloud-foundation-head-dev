Write-Host "Stopping Sitecore environment..." -ForegroundColor Green
docker compose --env-file .env --env-file .env.local stop
