#!/bin/bash
echo "Stopping server"

# Load NVM
source /home/ec2-user/.nvm/nvm.sh
nvm use 18.20.4

# Stop all PM2 processes (matching manual process)
pm2 stop all || true
pm2 delete all || true

echo "Server stopped successfully"
