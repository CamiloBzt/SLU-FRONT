#!/bin/bash
echo "Cleaning up old application"
cd /home/ec2-user

# Remove the old front_dev_slu directory
rm -rf front_dev_slu

# Create new directory
mkdir front_dev_slu

# Remove nginx configurations that might conflict with PM2
sudo rm -f /etc/nginx/conf.d/vue-app.conf || true

echo "Cleanup completed successfully"
