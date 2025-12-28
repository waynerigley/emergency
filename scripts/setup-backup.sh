#!/bin/bash
# Setup script for Rescue Link ID automated backups
# Run this on the production server to configure daily backups

set -e

echo "=== Rescue Link ID Backup Setup ==="

# Configuration
BACKUP_DIR="/var/www/rescuelink-backups"
SSH_KEY="/root/.ssh/rescuelink_backup"

# 1. Generate SSH key for GitHub if it doesn't exist
if [ ! -f "$SSH_KEY" ]; then
    echo "Generating SSH key for GitHub..."
    ssh-keygen -t ed25519 -f "$SSH_KEY" -N "" -C "rescuelink-backup@server"
    echo ""
    echo "=== IMPORTANT: Add this deploy key to your private repo ==="
    echo "Go to: https://github.com/waynerigley/rescuelink-backups/settings/keys"
    echo "Click 'Add deploy key' and paste this key:"
    echo ""
    cat "${SSH_KEY}.pub"
    echo ""
    echo "Make sure to check 'Allow write access'"
    echo "Press Enter when done..."
    read
fi

# 2. Configure SSH to use this key for GitHub
if ! grep -q "rescuelink-backups" /root/.ssh/config 2>/dev/null; then
    echo "Configuring SSH for GitHub..."
    cat >> /root/.ssh/config << 'EOF'

# Rescue Link backup repo
Host github.com-backup
    HostName github.com
    User git
    IdentityFile /root/.ssh/rescuelink_backup
    IdentitiesOnly yes
EOF
fi

# 3. Create backup directory and initialize repo
echo "Setting up backup directory..."
mkdir -p "$BACKUP_DIR"
cd "$BACKUP_DIR"

if [ ! -d ".git" ]; then
    git init
    git remote add origin git@github.com-backup:waynerigley/rescuelink-backups.git
    echo "# Rescue Link ID Backups" > README.md
    echo "" >> README.md
    echo "Private repository for automated daily backups of Rescue Link ID data." >> README.md
    echo "" >> README.md
    echo "**CONFIDENTIAL**: This repository contains sensitive user data." >> README.md
    git add README.md
    git commit -m "Initial setup"
fi

# 4. Copy backup script
echo "Installing backup script..."
cp /var/www/rescuelink/scripts/backup-to-github.sh /usr/local/bin/rescuelink-backup
chmod +x /usr/local/bin/rescuelink-backup

# 5. Setup cron job for daily backup at 2 AM
echo "Setting up daily cron job..."
CRON_JOB="0 2 * * * /usr/local/bin/rescuelink-backup >> /var/log/rescuelink-backup.log 2>&1"

# Check if cron job already exists
if ! crontab -l 2>/dev/null | grep -q "rescuelink-backup"; then
    (crontab -l 2>/dev/null || true; echo "$CRON_JOB") | crontab -
    echo "Cron job installed: Daily backup at 2 AM"
else
    echo "Cron job already exists"
fi

# 6. Run initial backup
echo ""
echo "Running initial backup..."
/usr/local/bin/rescuelink-backup || echo "Initial backup skipped (repo may need setup on GitHub first)"

echo ""
echo "=== Setup Complete ==="
echo ""
echo "Daily backups will run at 2 AM and push to:"
echo "https://github.com/waynerigley/rescuelink-backups (private repo)"
echo ""
echo "To run a manual backup: /usr/local/bin/rescuelink-backup"
echo "To view backup logs: tail -f /var/log/rescuelink-backup.log"
