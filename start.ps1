Write-Host "Starting Sitecore environment..." -ForegroundColor Green
docker compose --env-file .env --env-file .env.local start
