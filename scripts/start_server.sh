#!/bin/bash
echo "Starting server"
cd /home/ec2-user/front_dev_slu

# Load NVM and use the correct Node version
source /home/ec2-user/.nvm/nvm.sh
nvm use 18.20.4

# Start the application with PM2 (matching manual process)
pm2 start npm --name "front_dev_slu" -- run serve

echo "Server started successfully"
