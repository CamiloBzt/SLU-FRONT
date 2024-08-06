#!/bin/bash
echo "Starting server"
cd /home/ec2-user/front_dev_slu
# Start the Vue.js application
pm2 restart 0
# Start Nginx
sudo systemctl start nginx
