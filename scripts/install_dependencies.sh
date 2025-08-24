#!/bin/bash
source /home/ec2-user/.bash_profile
echo "Installing dependencies"
cd /home/ec2-user/front_dev_slu

# Load NVM and use the correct Node version
source /home/ec2-user/.nvm/nvm.sh
nvm use 18.20.4

# Clean cache and install dependencies (matching manual process)
npm cache clean --force
npm i --force

echo "Dependencies installed successfully"


