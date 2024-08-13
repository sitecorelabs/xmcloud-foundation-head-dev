# Set the root of the repository
$RepoRoot = Resolve-Path "$PSScriptRoot\..\.."

Write-Host "Down containers..." -ForegroundColor Green
try {
  Push-Location $RepoRoot\local-containers
  docker-compose down
  Pop-Location
  if ($LASTEXITCODE -ne 0) {
    Write-Error "Container down failed, see errors above."
  }
}
finally {
}
