#!/bin/bash

# Spanish Email Scheduler Deployment Script
# Run this on your server after cloning the repository

echo "🚀 Setting up Spanish Email Scheduler..."

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install dependencies
npm install

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'spanish-email-scheduler',
    script: 'index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
EOF

# Start the application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup

echo "✅ Spanish Email Scheduler deployed successfully!"
echo "📧 Check logs with: pm2 logs spanish-email-scheduler"
echo "🔄 Restart with: pm2 restart spanish-email-scheduler"
echo "⏹️  Stop with: pm2 stop spanish-email-scheduler" 