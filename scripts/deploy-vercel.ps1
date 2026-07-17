# Deploy Achint portfolio to Vercel (run after: npx vercel login)
# Usage: .\scripts\deploy-vercel.ps1

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $Root

$scope = "achintarora-ais-projects"
$envFile = Join-Path $Root ".env.local"

Write-Host "Linking project to Vercel team: $scope"
npx vercel@latest link --yes --scope $scope 2>$null
if ($LASTEXITCODE -ne 0) {
  npx vercel@latest link --scope $scope
}

if (Test-Path $envFile) {
  Write-Host "Uploading environment variables from .env.local..."
  Get-Content $envFile | ForEach-Object {
    if ($_ -match '^\s*#' -or $_ -match '^\s*$') { return }
    $idx = $_.IndexOf('=')
    if ($idx -lt 1) { return }
    $name = $_.Substring(0, $idx).Trim()
    $value = $_.Substring($idx + 1).Trim()
    if (-not $value) { return }
    Write-Host "  -> $name"
    $value | npx vercel@latest env add $name production --scope $scope --force 2>$null
    $value | npx vercel@latest env add $name preview --scope $scope --force 2>$null
    $value | npx vercel@latest env add $name development --scope $scope --force 2>$null
  }
}

Write-Host "Deploying to production..."
npx vercel@latest deploy --prod --yes --scope $scope

Write-Host "Done. Open your project at https://vercel.com/$scope"
