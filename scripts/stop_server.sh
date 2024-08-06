#!/bin/bash
echo "Stopping existing server"
sudo systemctl stop nginx
# Stop PM2 processes
pm2 stop all || true
