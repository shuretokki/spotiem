# Script to remove redundant JSDoc comments from source files
# Keeps only @format and complex function parameter docs

$files = @(
  "src\carousel.js",
  "src\products.js",
  "src\productDetail.js",
  "src\mobileMenu.js",
  "src\constants.js"
)

foreach ($file in $files) {
  if (Test-Path $file) {
    $content = Get-Content $file -Raw

    # Remove JSDoc block comments but keep @format
    $content = $content -replace '(?<!/\*\*\s*@format\s*\*/)\s*/\*\*\s*\n\s*\*[^\*]*?\*/\s*\n', ''

    # Remove single-line JSDoc comments (like /** Description */)
    $content = $content -replace '\s*/\*\*\s*[^@\n][^\*]*?\*/\s*\n', ''

    # Clean up multiple blank lines
    $content = $content -replace '\n{3,}', "`n`n"

    Set-Content -Path $file -Value $content -NoNewline
    Write-Host "Cleaned $file"
  }
}

Write-Host "`nDone! All redundant comments removed."
