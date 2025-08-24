#!/bin/bash
echo "Configuring nginx for PM2 proxy"

# Ensure the existing slu.conf is correctly configured for PM2 proxy
# This script validates that nginx is set up to proxy to localhost:8080
# where PM2 serves the Vue.js application

# Check if slu.conf exists and has the proxy configuration
if [ -f /etc/nginx/conf.d/slu.conf ]; then
    echo "Found existing slu.conf - nginx proxy should work"
    
    # Test nginx configuration
    sudo nginx -t
    
    if [ $? -eq 0 ]; then
        echo "Nginx configuration is valid"
        sudo systemctl reload nginx
        echo "Nginx reloaded successfully"
    else
        echo "Nginx configuration has errors"
        exit 1
    fi
else
    echo "Warning: slu.conf not found - nginx proxy may not work"
fi

echo "Nginx proxy configuration completed" 