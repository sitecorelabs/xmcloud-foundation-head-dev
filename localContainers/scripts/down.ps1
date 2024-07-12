Write-Host "Down containers..." -ForegroundColor Green
try {
  Push-Location "../"
  docker-compose down
  Pop-Location
  if ($LASTEXITCODE -ne 0) {
    Write-Error "Container down failed, see errors above."
  }
}
finally {
}
