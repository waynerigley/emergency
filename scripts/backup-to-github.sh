#!/bin/bash
# Rescue Link ID - Daily Backup Script
# This script exports all data and pushes to a private GitHub repo
# Should be run on the production server via cron

set -e

# Configuration
BACKUP_DIR="/var/www/rescuelink-backups"
DATA_DIR="/var/www/rescuelink/data"
REPO_URL="git@github.com-backup:waynerigley/rescuelink-backups.git"
DATE=$(date +%Y-%m-%d)
TIMESTAMP=$(date +%Y-%m-%d_%H-%M-%S)

# Create backup directory if it doesn't exist
if [ ! -d "$BACKUP_DIR" ]; then
    mkdir -p "$BACKUP_DIR"
    cd "$BACKUP_DIR"
    git init
    git remote add origin "$REPO_URL"
fi

cd "$BACKUP_DIR"

# Pull latest changes
git fetch origin main 2>/dev/null || true
git checkout main 2>/dev/null || git checkout -b main

# Create dated backup files
mkdir -p "$BACKUP_DIR/backups"

# Copy user data
if [ -f "$DATA_DIR/users.json" ]; then
    cp "$DATA_DIR/users.json" "$BACKUP_DIR/backups/users.json"
fi

# Copy profile data
if [ -f "$DATA_DIR/profiles.json" ]; then
    cp "$DATA_DIR/profiles.json" "$BACKUP_DIR/backups/profiles.json"
fi

# Create a combined export with metadata
cat > "$BACKUP_DIR/backups/export-$DATE.json" << EXPORT_EOF
{
  "exportDate": "$TIMESTAMP",
  "version": "1.0",
  "users": $(cat "$DATA_DIR/users.json" 2>/dev/null || echo "[]"),
  "profiles": $(cat "$DATA_DIR/profiles.json" 2>/dev/null || echo "[]")
}
EXPORT_EOF

# Create latest symlink
ln -sf "export-$DATE.json" "$BACKUP_DIR/backups/latest.json"

# Stage all changes first
git add -A

# Check if there are staged changes
if git diff --cached --quiet; then
    echo "No changes to backup"
    exit 0
fi

# Commit and push
git commit -m "Backup: $TIMESTAMP

Automated daily backup of Rescue Link ID data"

git push -u origin main

echo "Backup completed successfully: $TIMESTAMP"
