If (-Not (Test-Path -Path "./node_modules")) {
    Write-Host "Node Modules folder does not exist. Installing dependencies..."
    npm ci
}
npm start